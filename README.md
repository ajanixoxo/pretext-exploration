# Pretext Chat 💬✨

A premium, high-performance anonymous real-time chat application built to explore the boundaries of web typography and UI aesthetics. Pretext Chat leverages the `@chenglou/pretext` library to deliver character-level kinetic typography, alongside a WebGL-powered glassmorphic interface and low-latency peer-to-peer networking via LiveKit.

## ✨ Features

- **Kinetic Typography**: Messages and typing indicators don't just appear; they elegantly drop and shift into place using high-performance, layout-aware character segmentation (`@chenglou/pretext`).
- **Real-Time Matchmaking**: Instantly connect with strangers in a virtual lobby using secure LiveKit data channels.
- **WebGL Backgrounds**: A captivating `PixelBlast` Three.js background creates a dynamic, moving environment with a "digital scan" aesthetic that reacts to the chat.
- **Glassmorphic UI**: Deeply layered, frosted-glass components tailored around a premium `#B19EEF` theme.
- **Mock Mode**: Seamlessly fallback to virtual connections for UI development without needing immediate networking credentials.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Networking**: [LiveKit](https://livekit.io/) (`livekit-client`, `@livekit/components-react`, `livekit-server-sdk`)
- **Typography & Layout**: [`@chenglou/pretext`](https://github.com/chenglou/pretext)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Graphics**: [Three.js](https://threejs.org/) & `postprocessing`
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: Tailwind CSS (v4) & `clsx`/`tailwind-merge`

## 🚀 Getting Started

### 1. Installation

Clone the project and install all dependencies (we recommend using npm with the `--legacy-peer-deps` flag to satisfy WebGL package peer requirements).

```bash
npm install --legacy-peer-deps
```

### 2. Environment Variables

To enable real-time matchmaking, you need to set up a LiveKit project. Create a `.env` file in the root of the project:

```env
# LiveKit Credentials
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

> **Note:** If you don't provide these credentials, the app will safely fallback to a "Mock Mode", allowing you to preview the UI transitions and kinetic typography locally with a virtual stranger.

### 3. Run the Development Server

Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the chat layout.

## 🧠 Architecture Highlights

- **`lib/store.ts`**: Global Zustand store tracking matchmaking status (`idle`, `searching`, `connected`, `disconnected`) and chat messages.
- **`hooks/useLiveKit.ts`**: Encapsulates the LiveKit `Room` lifecycle, managing secure token authentication and broadcasting kinetic typing indicators over reliable WebRTC data channels.
- **`components/MessageItem.tsx`**: The heart of the kinetic rendering, hooking into Pretext to convert raw strings into isolated, animatable layout blocks without triggering costly browser reflows.

## 📝 License

This project is intended as a creative exploration of UI/UX and web technologies. Feel free to use the concepts and components to build your own next-generation interfaces.
