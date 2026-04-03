import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Room, 
  RoomEvent, 
  DataPacket_Kind, 
  Participant,
  RemoteParticipant
} from 'livekit-client';
import { useChatStore } from '@/lib/store';

export const useLiveKit = () => {
  const { 
    token, 
    connectionUrl, 
    status, 
    setStatus, 
    addMessage, 
    setGhostMessage,
    reset
  } = useChatStore();
  
  const roomRef = useRef<Room | null>(null);

  // Send data helper
  const sendData = useCallback(async (data: any) => {
    if (!roomRef.current) return;
    const encoder = new TextEncoder();
    const payload = encoder.encode(JSON.stringify(data));
    try {
      await roomRef.current.localParticipant.publishData(payload, {
        reliable: true
      });
    } catch (e) {
      console.error('Failed to publish data:', e);
    }
  }, []);

  const sendMessage = useCallback((text: string) => {
    sendData({ type: 'message', text });
  }, [sendData]);

  const sendTypingStatus = useCallback((text: string | null) => {
    sendData({ type: 'typing', text });
  }, [sendData]);

  const connectingRef = useRef(false);

  useEffect(() => {
    if (!token || !connectionUrl || (status !== 'searching' && status !== 'connected')) {
      return;
    }

    if (connectingRef.current) return;

    // Handle mock token for development
    if (token.startsWith('mock_token_')) {
      console.warn('Mock LiveKit connection active.');
      connectingRef.current = true;
      const timer = setTimeout(() => {
        setStatus('connected');
      }, 3000);
      return () => {
        clearTimeout(timer);
        connectingRef.current = false;
      };
    }

    const room = new Room();
    roomRef.current = room;
    connectingRef.current = true;

    const connect = async () => {
      try {
        await room.connect(connectionUrl, token);
        console.log('Connected to LiveKit room', room.name);

        if (room.remoteParticipants.size > 0) {
          setStatus('connected');
        }

        room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
          console.log('Participant connected', participant.identity);
          setStatus('connected');
        });

        room.on(RoomEvent.ParticipantDisconnected, () => {
          console.log('Participant disconnected');
          setStatus('disconnected');
        });

        room.on(RoomEvent.Disconnected, () => {
          console.log('Room disconnected');
          setStatus('disconnected');
          connectingRef.current = false;
        });

        room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant?: RemoteParticipant) => {
          const decoder = new TextDecoder();
          const data = JSON.parse(decoder.decode(payload));
          
          if (data.type === 'message') {
            addMessage(data.text, 'other');
          } else if (data.type === 'typing') {
            setGhostMessage(data.text);
          }
        });

      } catch (error) {
        console.error('Error connecting to LiveKit:', error);
        // Only reset if it's not a client-initiated disconnect from a re-render
        if (error instanceof Error && !error.message.includes('Client initiated disconnect')) {
          setStatus('idle');
        }
        connectingRef.current = false;
      }
    };

    connect();

    return () => {
      console.log('Disconnecting from LiveKit room');
      room.removeAllListeners();
      room.disconnect();
      roomRef.current = null;
      connectingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, connectionUrl]);

  return { sendMessage, sendTypingStatus };
};
