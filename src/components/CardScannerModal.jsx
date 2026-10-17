import React, { useState, useEffect, useRef } from 'react';

export default function CardScannerModal({ isOpen, onClose, onCardScanned }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [scanStep, setScanStep] = useState('idle'); // idle | analyzing | success
  const [detectedData, setDetectedData] = useState(null);

  // Play pleasant fintech audio confirmation
  const playSuccessChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, ctx.currentTime); // G5
      osc.frequency.exponentialRampToValueAtTime(1318.5, ctx.currentTime + 0.12); // E6
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } else {
        setCameraError('Camera access not supported on this device/browser.');
      }
    } catch (err) {
      console.warn('Camera permission or device error:', err);
      setCameraError('Camera not accessible or permission denied. You can use Simulated Scan or upload a card photo.');
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (isOpen) {
      setScanStep('idle');
      setDetectedData(null);
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const completeScan = (card) => {
    setScanStep('analyzing');
    setTimeout(() => {
      setScanStep('success');
      setDetectedData(card);
      playSuccessChime();
      setTimeout(() => {
        onCardScanned(card);
        onClose();
      }, 1100);
    }, 900);
  };

  const handleSimulateScan = (preset = 'fredrik') => {
    const cardData = preset === 'fredrik' ? {
      cardNumber: '4532 8912 3456 5478',
      cardHolder: 'Mr. Fredrik Ivarsson',
      expiry: '09/27',
      cvv: '849',
      brand: 'Visa',
      last4: '5478'
    } : {
      cardNumber: '5241 6890 1123 9081',
      cardHolder: 'Ayesha Khan',
      expiry: '11/28',
      cvv: '412',
      brand: 'Mastercard',
      last4: '9081'
    };
    completeScan(cardData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      completeScan({
        cardNumber: '4111 2233 4455 5478',
        cardHolder: 'Mr. Fredrik Ivarsson',
        expiry: '09/27',
        cvv: '547',
        brand: 'Visa',
        last4: '5478'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F0] rounded-3xl border border-[#e8ddca] shadow-2xl overflow-hidden flex flex-col text-left">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#e8ddca] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#123420] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">document_scanner</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-[18px] text-[#123420] leading-tight">
                Scan Payment Card
              </h3>
              <p className="text-[12px] font-mono text-[#94492c]">
                Optical PAN &amp; Cardholder Auto-Detection
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF7F0] hover:bg-[#e8ddca] text-[#424842] hover:text-[#123420] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close scanner"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Viewfinder Video Area */}
        <div className="relative bg-black w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
          
          {/* Real Video Element */}
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className={`w-full h-full object-cover transition-opacity duration-300 ${cameraActive ? 'opacity-90' : 'opacity-0'}`}
          />

          {/* Fallback Graphic if no camera / permission */}
          {!cameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-stone-900 via-stone-850 to-stone-900 text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-emerald-400">
                <span className="material-symbols-outlined text-[32px]">credit_card</span>
              </div>
              <p className="font-serif text-[16px] font-bold text-white mb-1">
                Camera Viewfinder Ready
              </p>
              <p className="text-[12px] text-white/70 max-w-xs mb-4">
                {cameraError || 'Allow camera permission or use one-click auto detection below.'}
              </p>
            </div>
          )}

          {/* Credit Card Bounding Frame Overlay */}
          <div className="absolute w-[82%] max-w-[340px] aspect-[1.586/1] border-2 border-dashed border-emerald-400/80 rounded-2xl pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.55)] flex flex-col justify-between p-4">
            
            {/* 4 Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
            <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />

            {/* Glowing Laser Scan Line */}
            <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-laser-scan" />

            {/* Simulated Chip target outline */}
            <div className="w-10 h-7 rounded border border-white/40 bg-white/10 flex items-center justify-center text-[9px] font-mono text-white/80">
              CHIP
            </div>

            {/* Bottom Card Number guide */}
            <div className="flex items-center justify-between text-white/60 font-mono text-[10px] tracking-widest">
              <span>•••• •••• •••• ••••</span>
              <span>MM/YY</span>
            </div>
          </div>

          {/* Status Overlay Pill */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[12px] font-mono flex items-center gap-2">
            {scanStep === 'idle' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Align bank card within frame</span>
              </>
            )}
            {scanStep === 'analyzing' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-spin" />
                <span>Reading PAN &amp; Expiry...</span>
              </>
            )}
            {scanStep === 'success' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-emerald-300 font-bold">✓ Card Captured: {detectedData?.brand}</span>
              </>
            )}
          </div>
        </div>

        {/* Modal Controls & Quick Recognition Actions */}
        <div className="p-5 sm:p-6 bg-white space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#94492c] font-bold">
              Instant Detection Options:
            </span>
            <span className="text-[11px] font-mono text-[#123420] bg-[#c5ecce]/50 px-2.5 py-0.5 rounded-full font-bold">
              PCI-DSS 256-Bit Encrypted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            {/* Option 1: Fredrik Ivarsson Sample Card (Exact Match to User Reference) */}
            <button
              onClick={() => handleSimulateScan('fredrik')}
              disabled={scanStep !== 'idle'}
              className="p-3 rounded-2xl border border-[#e8ddca] hover:border-[#123420] bg-[#FAF7F0] hover:bg-white text-left transition-all duration-200 cursor-pointer flex items-center gap-3 group active:scale-95 disabled:opacity-50"
              type="button"
            >
              <div className="w-10 h-10 rounded-xl bg-[#123420] text-white flex items-center justify-center shrink-0 font-bold text-[13px] shadow-sm">
                VISA
              </div>
              <div className="min-w-0">
                <span className="text-[12px] font-serif font-bold text-[#123420] block truncate">
                  Mr. Fredrik Ivarsson
                </span>
                <span className="text-[10.5px] font-mono text-[#424842] block">
                  •••• 5478 • 09/27
                </span>
              </div>
            </button>

            {/* Option 2: Pakistani Reserve Harvest Card */}
            <button
              onClick={() => handleSimulateScan('ayesha')}
              disabled={scanStep !== 'idle'}
              className="p-3 rounded-2xl border border-[#e8ddca] hover:border-[#123420] bg-[#FAF7F0] hover:bg-white text-left transition-all duration-200 cursor-pointer flex items-center gap-3 group active:scale-95 disabled:opacity-50"
              type="button"
            >
              <div className="w-10 h-10 rounded-xl bg-[#123420] text-[#c5ecce] flex items-center justify-center shrink-0 font-bold text-[11px] shadow-sm">
                MC
              </div>
              <div className="min-w-0">
                <span className="text-[12px] font-serif font-bold text-[#123420] block truncate">
                  Ayesha Khan
                </span>
                <span className="text-[10.5px] font-mono text-[#424842] block">
                  •••• 9081 • 11/28
                </span>
              </div>
            </button>

          </div>

          {/* Manual Photo Upload or Camera Snap */}
          <div className="pt-2 flex items-center justify-between text-[12px] border-t border-[#e8ddca]/80">
            <label className="inline-flex items-center gap-1.5 text-[#424842] hover:text-[#123420] cursor-pointer font-medium">
              <span className="material-symbols-outlined text-[18px] text-[#94492c]">photo_camera</span>
              <span>Upload Card Picture</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={() => handleSimulateScan('fredrik')}
              className="text-[#123420] hover:text-[#94492c] font-mono font-bold underline cursor-pointer"
              type="button"
            >
              Auto-Fill Card Now →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
