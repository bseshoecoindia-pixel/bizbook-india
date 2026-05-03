// Shim for @caffeineai/qr-code — QR scanning not available in this environment
import { useRef } from "react";

export interface QRScannerOptions {
  facingMode?: string;
  scanInterval?: number;
}

export interface QRResult {
  data: string;
}

export interface QRScannerResult {
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

export function useQRScanner(_options?: QRScannerOptions): QRScannerResult {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return {
    qrResults: [],
    isActive: false,
    error: null,
    isLoading: false,
    canStartScanning: false,
    startScanning: () => {},
    stopScanning: () => {},
    videoRef,
    canvasRef,
  };
}
