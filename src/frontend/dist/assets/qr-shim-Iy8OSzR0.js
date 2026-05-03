import { r as reactExports } from "./index-DHdUgTPk.js";
function useQRScanner(_options) {
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  return {
    qrResults: [],
    isActive: false,
    error: null,
    isLoading: false,
    canStartScanning: false,
    startScanning: () => {
    },
    stopScanning: () => {
    },
    videoRef,
    canvasRef
  };
}
export {
  useQRScanner as u
};
