"use client";

import { useChatStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import FaultyTerminal from '@/components/FaultyTerminal'
import PixelBlast from '@/components/PixelBlast'
export default function LandingView() {
  const setStatus = useChatStore((state) => state.setStatus);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 text-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-80">
        {/* <FaultyTerminal
          scale={1.5}
          digitSize={1.2}
          scanlineIntensity={0.2}
          glitchAmount={0.5}
          flickerAmount={0.8}
          noiseAmp={0.05}
          chromaticAberration={0.1}
          dither={0.1}
          curvature={0.2}
          tint="#ffffff"
          mouseReact
          mouseStrength={0.15}
          brightness={0.8}
        /> */}
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#B19EEF"
          patternScale={2}
          patternDensity={1}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={1}
          speed={0.5}
          transparent
          edgeFade={0.5}
        />
      </div>

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-8">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold tracking-tighter text-zinc-100">
            Pretext <span className="text-[#B19EEF]">Chat</span>
          </h1>
          <p className="text-lg text-[#B19EEF]">
            Talk to strangers, but better. Anonymous, fast, and animated.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStatus("searching")}
          className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-lg font-semibold text-black transition-all hover:bg-zinc-200"
        >
          <Zap className="h-5 w-5 fill-current" />
          Start Chatting
          {/* Subtle glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.15 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </motion.button>

        <div className="text-xs font-mono text-[#B19EEF] uppercase tracking-widest">
          No account required • Instant Connect
        </div>
      </div>
    </div>
  );
}
