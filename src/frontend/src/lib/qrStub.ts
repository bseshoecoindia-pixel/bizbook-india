// Stub for @caffeineai/qr-code — replace with the real platform package when available
import { useRef } from "react";

export interface QRResult {
  data: string;
}

export interface UseQRScannerOptions {
  facingMode?: string;
  scanInterval?: number;
}

export interface UseQRScannerReturn {
  qrResults: QRResult[];
  isActive: boolean;
  error: string | null;
  isLoading: boolean;
  canStartScanning: boolean;
  startScanning: () => void;
  stopScanning: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function useQRScanner(
  _options?: UseQRScannerOptions,
): UseQRScannerReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return {
    qrResults: [],
    isActive: false,
    error: "QR scanner not available",
    isLoading: false,
    canStartScanning: false,
    startScanning: () => {},
    stopScanning: () => {},
    videoRef,
    canvasRef,
  };
}
