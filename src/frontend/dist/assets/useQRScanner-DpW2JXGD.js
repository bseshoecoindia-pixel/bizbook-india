import { c as createLucideIcon, r as reactExports } from "./index-BOl89Uzk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16", key: "qmtpty" }],
  ["path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5", key: "1ufyfc" }],
  ["path", { d: "M14.121 15.121A3 3 0 1 1 9.88 10.88", key: "11zox6" }]
];
const CameraOff = createLucideIcon("camera-off", __iconNode);
const useCamera = (config = {}) => {
  const { facingMode = "environment", width = 1920, height = 1080, quality = 0.8, format = "image/jpeg" } = config;
  const [isActive, setIsActive] = reactExports.useState(false);
  const [isSupported, setIsSupported] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [currentFacingMode, setCurrentFacingMode] = reactExports.useState(facingMode);
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const isMountedRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    var _a;
    const supported = !!((_a = navigator.mediaDevices) == null ? void 0 : _a.getUserMedia);
    setIsSupported(supported);
  }, []);
  const cleanup = reactExports.useCallback(() => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);
  reactExports.useEffect(() => {
    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);
  const createMediaStream = reactExports.useCallback(async (facing) => {
    try {
      const constraints = {
        video: {
          facingMode: facing,
          width: { ideal: width },
          height: { ideal: height }
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (!isMountedRef.current) {
        for (const track of stream.getTracks()) {
          track.stop();
        }
        return null;
      }
      return stream;
    } catch (err) {
      let errorType = "unknown";
      let errorMessage = "Failed to access camera";
      if (err.name === "NotAllowedError") {
        errorType = "permission";
        errorMessage = "Camera permission denied";
      } else if (err.name === "NotFoundError") {
        errorType = "not-found";
        errorMessage = "No camera device found";
      } else if (err.name === "NotSupportedError") {
        errorType = "not-supported";
        errorMessage = "Camera is not supported";
      }
      throw { type: errorType, message: errorMessage };
    }
  }, [width, height]);
  const setupVideo = reactExports.useCallback(async (stream) => {
    if (!videoRef.current)
      return false;
    const video = videoRef.current;
    video.srcObject = stream;
    return new Promise((resolve) => {
      const onLoadedMetadata = () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("error", onError);
        video.play().catch((err) => {
          console.warn("Video autoplay failed:", err);
        });
        resolve(true);
      };
      const onError = () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("error", onError);
        resolve(false);
      };
      video.addEventListener("loadedmetadata", onLoadedMetadata);
      video.addEventListener("error", onError);
      if (video.readyState >= 1) {
        onLoadedMetadata();
      }
    });
  }, []);
  const startCamera = reactExports.useCallback(async () => {
    if (isSupported === false || isLoading) {
      return false;
    }
    setIsLoading(true);
    setError(null);
    try {
      cleanup();
      const stream = await createMediaStream(currentFacingMode);
      if (!stream)
        return false;
      streamRef.current = stream;
      const success = await setupVideo(stream);
      if (success && isMountedRef.current) {
        setIsActive(true);
        return true;
      }
      cleanup();
      return false;
    } catch (err) {
      if (isMountedRef.current) {
        setError(err);
      }
      cleanup();
      return false;
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [
    isSupported,
    isLoading,
    currentFacingMode,
    cleanup,
    createMediaStream,
    setupVideo
  ]);
  const stopCamera = reactExports.useCallback(async () => {
    if (isLoading)
      return;
    setIsLoading(true);
    cleanup();
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (isMountedRef.current) {
      setIsLoading(false);
    }
  }, [isLoading, cleanup]);
  const switchCamera = reactExports.useCallback(async (newFacingMode) => {
    if (isSupported === false || isLoading) {
      return false;
    }
    const targetFacingMode = newFacingMode || (currentFacingMode === "user" ? "environment" : "user");
    setIsLoading(true);
    setError(null);
    try {
      cleanup();
      setCurrentFacingMode(targetFacingMode);
      await new Promise((resolve) => setTimeout(resolve, 100));
      const stream = await createMediaStream(targetFacingMode);
      if (!stream)
        return false;
      streamRef.current = stream;
      const success = await setupVideo(stream);
      if (success && isMountedRef.current) {
        setIsActive(true);
        return true;
      }
      cleanup();
      return false;
    } catch (err) {
      if (isMountedRef.current) {
        setError(err);
      }
      cleanup();
      return false;
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [
    isSupported,
    isLoading,
    currentFacingMode,
    cleanup,
    createMediaStream,
    setupVideo
  ]);
  const retry = reactExports.useCallback(async () => {
    if (isLoading)
      return false;
    setError(null);
    await stopCamera();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return startCamera();
  }, [isLoading, stopCamera, startCamera]);
  const capturePhoto = reactExports.useCallback(() => {
    return new Promise((resolve) => {
      if (!videoRef.current || !canvasRef.current || !isActive) {
        resolve(null);
        return;
      }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      if (currentFacingMode === "user") {
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0);
      } else {
        ctx.drawImage(video, 0, 0);
      }
      canvas.toBlob((blob) => {
        if (blob) {
          const extension = format.split("/")[1];
          const file = new File([blob], `photo_${Date.now()}.${extension}`, {
            type: format
          });
          resolve(file);
        } else {
          resolve(null);
        }
      }, format, quality);
    });
  }, [isActive, format, quality, currentFacingMode]);
  return {
    // State
    isActive,
    isSupported,
    error,
    isLoading,
    currentFacingMode,
    // Actions
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    retry,
    // Refs for components
    videoRef,
    canvasRef
  };
};
const useQRScanner = (config) => {
  const { scanInterval = 100, maxResults = 10, jsQRUrl = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js", ...cameraConfig } = config;
  const [qrResults, setQrResults] = reactExports.useState([]);
  const [isScanning, setIsScanning] = reactExports.useState(false);
  const [jsQRLoaded, setJsQRLoaded] = reactExports.useState(false);
  const scanIntervalRef = reactExports.useRef(null);
  const lastScanRef = reactExports.useRef("");
  const isMountedRef = reactExports.useRef(true);
  const camera = useCamera(cameraConfig);
  reactExports.useEffect(() => {
    if (typeof window === "undefined")
      return;
    if (window.jsQR) {
      setJsQRLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = jsQRUrl;
    script.onload = () => {
      if (isMountedRef.current) {
        setJsQRLoaded(true);
      }
    };
    script.onerror = () => console.error("Failed to load jsQR library");
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [jsQRUrl]);
  reactExports.useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);
  const scanQRCode = reactExports.useCallback(() => {
    if (!camera.videoRef.current || !camera.canvasRef.current || !jsQRLoaded || !window.jsQR) {
      return;
    }
    const video = camera.videoRef.current;
    const canvas = camera.canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = window.jsQR(imageData.data, imageData.width, imageData.height);
    if ((code == null ? void 0 : code.data) && code.data !== lastScanRef.current) {
      lastScanRef.current = code.data;
      const newResult = {
        data: code.data,
        timestamp: Date.now()
      };
      if (isMountedRef.current) {
        setQrResults((prev) => [newResult, ...prev.slice(0, maxResults - 1)]);
      }
    }
  }, [camera.videoRef, camera.canvasRef, jsQRLoaded, maxResults]);
  reactExports.useEffect(() => {
    if (isScanning && camera.isActive && jsQRLoaded) {
      scanIntervalRef.current = setInterval(scanQRCode, scanInterval);
    } else {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
    }
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [isScanning, camera.isActive, jsQRLoaded, scanQRCode, scanInterval]);
  const startScanning = reactExports.useCallback(async () => {
    if (!camera.isActive) {
      const success = await camera.startCamera();
      if (success) {
        setIsScanning(true);
        return true;
      }
      return false;
    }
    setIsScanning(true);
    return true;
  }, [camera.isActive, camera.startCamera]);
  const stopScanning = reactExports.useCallback(async () => {
    setIsScanning(false);
    await camera.stopCamera();
    lastScanRef.current = "";
  }, [camera.stopCamera]);
  const switchCamera = reactExports.useCallback(async () => {
    const success = await camera.switchCamera();
    if (success && isScanning) {
      lastScanRef.current = "";
    }
    return success;
  }, [camera.switchCamera, isScanning]);
  const clearResults = reactExports.useCallback(() => {
    setQrResults([]);
    lastScanRef.current = "";
  }, []);
  const reset = reactExports.useCallback(() => {
    setIsScanning(false);
    clearResults();
  }, [clearResults]);
  return {
    // QR Scanner state
    qrResults,
    isScanning,
    jsQRLoaded,
    // Camera state (pass-through)
    isActive: camera.isActive,
    isSupported: camera.isSupported,
    error: camera.error,
    isLoading: camera.isLoading,
    currentFacingMode: camera.currentFacingMode,
    // Actions
    startScanning,
    stopScanning,
    switchCamera,
    clearResults,
    reset,
    retry: camera.retry,
    // Refs for components
    videoRef: camera.videoRef,
    canvasRef: camera.canvasRef,
    // Computed state
    isReady: jsQRLoaded && camera.isSupported !== false,
    canStartScanning: jsQRLoaded && camera.isSupported === true && !camera.isLoading
  };
};
export {
  CameraOff as C,
  useQRScanner as u
};
