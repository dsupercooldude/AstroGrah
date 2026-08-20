const { Component, useEffect } = window.React;

window.ErrorBoundary = class ErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { hasError: false, error: null }; }
    static getDerivedStateFromError(error) { return { hasError: true, error }; }
    render() {
        if (this.state.hasError) return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center bg-[#121426] text-white"><div className="bgcard2 p-6 rounded-3xl border border-red-500/40 max-w-md"><i className="ph ph-warning-octagon text-5xl text-amber-400 mb-3 inline-block"></i><h2 className="font-serif text-xl mb-2 text-amber-200">System Execution Fault</h2><p className="text-xs text-red-300 font-mono bg-black/40 p-3 rounded mb-4 overflow-auto max-h-36 text-left">{this.state.error?.toString()}</p><button onClick={() => { try{localStorage.clear();}catch(e){} window.location.reload(); }} className="w-full bg-amber-400 text-black py-2.5 rounded-full font-bold hover:bg-amber-300">Hard Reset Storage</button></div></div>
        ); return this.props.children;
    }
};

window.Icon = ({ name, size=16, className="", onClick }) => ( <i onClick={onClick} className={`ph ph-${name} ${className}`} style={{fontSize: size, cursor: onClick?'pointer':'inherit'}} /> );
window.SageLogo = ({ size=48 }) => ( <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="mx-auto drop-shadow-md"><circle cx="50" cy="50" r="48" stroke="#D4A574" strokeWidth="1.5" fill="rgba(212,165,116,0.06)"/><text x="50" y="65" fontFamily="serif" fontSize="45" fill="#D4A574" textAnchor="middle">ॐ</text></svg> );

window.useIdleTimeout = (onTimeout, idleTime = 300000) => {
    useEffect(() => {
        let timeoutId; const handleActivity = () => { clearTimeout(timeoutId); timeoutId = setTimeout(onTimeout, idleTime); };
        window.addEventListener('mousemove', handleActivity); window.addEventListener('keydown', handleActivity); window.addEventListener('touchstart', handleActivity); window.addEventListener('scroll', handleActivity);
        timeoutId = setTimeout(onTimeout, idleTime);
        return () => { window.removeEventListener('mousemove', handleActivity); window.removeEventListener('keydown', handleActivity); window.removeEventListener('touchstart', handleActivity); window.removeEventListener('scroll', handleActivity); clearTimeout(timeoutId); };
    }, [onTimeout, idleTime]);
};
