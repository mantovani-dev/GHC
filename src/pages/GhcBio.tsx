import { MessageCircle, Globe } from "lucide-react";

const GhcBio = () => {
  return (
    <div className="fixed inset-0 min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 overflow-hidden z-[9999] select-none">
      {/* Background glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #33bae9 0%, transparent 70%)"
        }}
      />
      
      {/* Logo Section */}
      <div className="animate-float mb-12 relative z-10 text-center">
        <div className="relative inline-block">
          <h1 
            className="text-7xl md:text-9xl font-bold tracking-tighter text-white"
            style={{
              textShadow: "0 0 30px #33bae9"
            }}
          >
            <span className="text-[#33bae9]">GHC</span>
            <span className="text-white">AREERS</span>
          </h1>
          {/* Linha Neon */}
          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#33bae9] to-transparent shadow-[0_0_15px_#33bae9]" />
        </div>
      </div>

      {/* Tagline */}
      <p className="text-gray-400 text-lg md:text-xl mb-10 text-center max-w-md relative z-10 font-medium">
        Tenha acesso à vagas exclusivas diariamente. 
        <br />
        Entre no nosso canal exclusivo!
      </p>

      {/* Container dos Botões */}
      <div className="flex flex-col gap-5 w-full max-w-sm relative z-10">
        
        {/* WhatsApp Button (Principal) */}
        <a
          href="https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-3 w-full px-8 py-5 bg-[#33bae9] text-black font-black text-xl rounded-full transition-all duration-300 hover:scale-105 animate-pulse-glow"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
          <span>Entrar no Canal</span>
          
          {/* Hover ring effect */}
          <span className="absolute inset-0 rounded-full border-4 border-[#33bae9] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
        </a>

        {/* Website Button (Secundário) */}
        <a
          href="/"
          className="group relative flex items-center justify-center gap-3 w-full px-8 py-5 bg-transparent border-2 border-[#33bae9] text-white font-bold text-xl rounded-full transition-all duration-300 hover:bg-[#33bae9]/10 hover:scale-105"
        >
          <Globe className="w-6 h-6 text-[#33bae9]" />
          <span>Entre no nosso site</span>
        </a>

      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 opacity-50">
        <div className="w-3 h-3 rounded-none rotate-45 border border-[#33bae9] bg-[#33bae9] animate-pulse" />
        <div className="w-3 h-3 rounded-none rotate-45 border border-white" />
        <div className="w-3 h-3 rounded-none rotate-45 border border-[#33bae9] bg-[#33bae9] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default GhcBio;