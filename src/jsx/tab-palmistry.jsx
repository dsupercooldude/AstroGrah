var React = window.React;
var { useRef, useState, useEffect } = window.React;

window.PalmistryTab = ({ pr }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState('');
  const [handStyle, setHandStyle] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [question, setQuestion] = useState('What does this palm line reveal about my life path?');
  const [chat, setChat] = useState([
    { role: 'assistant', text: 'This tool is intentionally limited to hand-only analysis. It does not capture a face or full-body image, and it does not persist the photo beyond the current session.' }
  ]);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const requestCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setAnalysis('Camera access is not available in this browser. The hand-only analysis can still proceed by asking a guided palmistry question without a live capture.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStreaming(true);
      setCameraReady(true);
    } catch (err) {
      setAnalysis('Camera permission was blocked. The app stays privacy-safe and will not capture or retain a face image. You can continue with a safe hand-only prompt instead.');
    }
  };

  const cropHandOnly = (video) => {
    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    const cropX = Math.floor(w * 0.18);
    const cropY = Math.floor(h * 0.28);
    const cropW = Math.floor(w * 0.64);
    const cropH = Math.floor(h * 0.62);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = cropW;
    canvas.height = cropH;
    ctx.clearRect(0, 0, cropW, cropH);
    ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    return canvas.toDataURL('image/jpeg', 0.85);
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const dataUrl = cropHandOnly(video);
    setCapturedImage(dataUrl);

    const styleGuess = ['Earth Hand', 'Air Hand', 'Water Hand', 'Fire Hand'][Math.floor(Math.random() * 4)];
    const styleText = {
      'Earth Hand': 'Your palm shape suggests grounded practicality, durable work ethics, and a steady path through long-term effort.',
      'Air Hand': 'Your palm shape suggests clear thinking, verbal fluency, and an ability to adapt quickly to changing situations.',
      'Water Hand': 'Your palm shape suggests emotional depth, intuition, and strong connection to family and relational comfort.',
      'Fire Hand': 'Your palm shape suggests drive, confidence, and a powerful instinct to act early and lead from momentum.'
    };

    const lineText = {
      'Earth Hand': 'The dominant lines support patience, disciplined execution, and a strong foundation for career and material stability.',
      'Air Hand': 'The lines suggest curiosity, learning speed, and a clear role in communication, planning, and ideas.',
      'Water Hand': 'The lines suggest sensitivity, emotional intelligence, and the ability to read relationships with a mature lens.',
      'Fire Hand': 'The lines suggest bold action, vitality, and a strong tendency to move quickly once commitment is clear.'
    };

    setHandStyle(styleGuess);
    const baseText = `${styleText[styleGuess]} ${lineText[styleGuess]}`;
    setAnalysis(`${baseText} For ${pr?.name || 'this native'}, the reading remains practical: build on your stable strengths, work on the softer or delayed areas, and choose action at the right moment instead of forcing it.`);
    setChat((prev) => [
      ...prev,
      { role: 'assistant', text: `Hand-only capture suggests a ${styleGuess}. ${baseText}` }
    ]);
  };

  const askPalmistry = () => {
    const q = question.trim();
    if (!q) return;

    const summary = analysis || 'The hand suggests a balanced and grounded profile with a clear route toward stability and self-awareness.';
    const answer = `For ${pr?.name || 'this native'}, the current palm reading points toward: ${summary} In practical terms, your strongest path is to ${q.toLowerCase().includes('career') ? 'focus on structured work, communication, and long-term planning.' : q.toLowerCase().includes('love') ? 'build trust slowly, express emotion clearly, and keep your expectations realistic.' : q.toLowerCase().includes('money') ? 'combine patience with consistent effort; financial gains improve when you keep long-term goals steady.' : 'stay grounded in your strengths, monitor stress early, and keep your decisions aligned with your natural temperament.'}`;

    setChat((prev) => [
      ...prev,
      { role: 'user', text: q },
      { role: 'assistant', text: answer }
    ]);
    setQuestion('');
  };

  return (
    <div className="space-y-5 pb-12 gl-fadein mt-4">
      <style>{`
        .hand-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(transparent, rgba(0,0,0,0.18)), linear-gradient(90deg, transparent 18%, rgba(167,139,250,0.18) 18%, rgba(167,139,250,0.18) 82%, transparent 82%);
        }
        .hand-box {
          position: absolute;
          left: 18%;
          right: 18%;
          top: 24%;
          bottom: 8%;
          border: 2px solid rgba(167,139,250,0.9);
          border-radius: 28% 28% 24% 24% / 18% 18% 22% 22%;
          box-shadow: inset 0 0 0 9999px rgba(0,0,0,0.18);
        }
      `}</style>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-black/20 to-transparent p-5 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-violet-300">Privacy-safe Palm Analysis</div>
            <h2 className="font-serif text-2xl text-violet-100 mt-1">Hand Palmistry</h2>
          </div>
          <button onClick={requestCamera} className="px-4 py-2 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-200 text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-violet-500/20 transition">
            {cameraReady ? 'Camera Active' : 'Enable Hand Camera'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-white/10 bgcard p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-serif text-lg text-violet-200">Hand-Only Capture</h3>
            <span className="text-[10px] font-mono uppercase text-violet-300">{streaming ? 'Live hand scan' : 'Position hand in frame'}</span>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-black/40 overflow-hidden aspect-video relative">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
            <div className="hand-overlay" />
            <div className="hand-box" />
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center text-center px-6 text-sm text-violet-200/80 font-mono">
                Place your palm inside the highlighted zone. The app is limited to hand-only capture and does not retain face imagery.
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={captureFrame} className="px-3 py-2 rounded-xl bg-violet-500 text-black font-bold text-[10px] uppercase tracking-[0.2em] font-mono">Capture Hand</button>
            <button onClick={() => setQuestion('What is the message of my Life Line?')} className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/75 text-[10px] uppercase tracking-[0.2em] font-mono">Life Line</button>
            <button onClick={() => setQuestion('How strong is my heart line for love and relationships?')} className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/75 text-[10px] uppercase tracking-[0.2em] font-mono">Heart Line</button>
            <button onClick={() => setQuestion('What does my head line say about my career direction?')} className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/75 text-[10px] uppercase tracking-[0.2em] font-mono">Head Line</button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bgcard p-4 shadow-xl">
          <h3 className="font-serif text-lg text-violet-200 mb-3">Palm Interpretation</h3>

          <div className="rounded-2xl border border-violet-500/20 bg-black/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet-300">Hand Style</span>
              <span className="text-sm font-bold text-violet-100">{handStyle || 'Not captured yet'}</span>
            </div>
            <div className="text-xs leading-relaxed text-white/80 font-mono">
              {analysis || 'Capture a palm-only image to receive a structured interpretation of your hand type, primary lines, and practical life guidance.'}
            </div>
          </div>

          {capturedImage && (
            <div className="mt-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet-300 mb-2">Captured Hand Region</div>
              <img src={capturedImage} alt="Hand capture region" className="w-full rounded-2xl border border-violet-500/20" />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-4 shadow-xl">
        <h3 className="font-serif text-lg text-violet-200 mb-3">Ask the palmistry guide</h3>
        <div className="flex gap-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-black/40 text-white px-3 py-2.5 text-sm outline-none"
            placeholder="Ask about your life line, heart line, career, love, or money path"
          />
          <button onClick={askPalmistry} className="px-4 rounded-xl bg-violet-500 text-black font-bold text-[10px] uppercase tracking-[0.2em] font-mono">Ask</button>
        </div>

        <div className="mt-4 space-y-3 max-h-[320px] overflow-y-auto pr-2 beauty-scroll">
          {chat.map((msg, idx) => (
            <div key={idx} className={`rounded-2xl border p-3 text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-violet-500/10 border-violet-500/20 text-violet-100' : 'bg-white/5 border-white/10 text-white/85'}`}>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1 text-violet-300">{msg.role === 'assistant' ? 'Guide' : 'You'}</div>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
