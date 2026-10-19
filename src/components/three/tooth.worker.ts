import { buildToothArrays } from './tooth-sdf';

// Builds the tooth mesh off the main thread, so scrolling never stutters while it loads.
const ctx = self as unknown as {
  onmessage: ((e: MessageEvent<number>) => void) | null;
  postMessage: (message: unknown, transfer: Transferable[]) => void;
};

ctx.onmessage = (e) => {
  const { position, normal } = buildToothArrays(e.data);
  ctx.postMessage({ position, normal }, [position.buffer, normal.buffer]);
};
