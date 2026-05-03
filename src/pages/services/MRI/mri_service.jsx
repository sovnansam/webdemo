import React, { useState } from "react";

const MRIService = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const faqs = [
        { q: "Is MRI painful?", a: "No, the procedure is completely painless. You might feel slight warmth or hear loud noises, but no pain." },
        { q: "How long does an MRI take?", a: "Typically 30-60 minutes, depending on the body part being scanned." },
        { q: "Can I eat before an MRI?", a: "For most MRIs, yes. Abdominal scans may require fasting for 4-6 hours." },
        { q: "Is MRI safe during pregnancy?", a: "Generally safe after the first trimester. Always inform your doctor." },
    ];

    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
            {/* Hero Section */}
<section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
    <div className="absolute inset-0 bg-black opacity-20"></div>
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>
    
    <div className="relative container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium">Advanced Imaging Technology</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                    Precision MRI
                    <span className="block text-blue-200">Diagnostics</span>
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-2xl">
                    State-of-the-art magnetic resonance imaging with exceptional clarity, speed, and patient comfort.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                        Schedule Now
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                    <button className="border-2 border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Right Column - SVG MRI Illustration */}
            <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* SVG MRI Machine Illustration */}
                    <svg 
                        viewBox="0 0 500 400" 
                        className="relative w-full max-w-md lg:max-w-lg transform group-hover:scale-105 transition-transform duration-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Scanner base */}
                        <rect x="50" y="280" width="400" height="40" rx="10" fill="#e0e7ff" opacity="0.3" />
                        <rect x="60" y="290" width="380" height="20" rx="5" fill="#c7d2fe" opacity="0.4" />
                        
                        {/* Main MRI bore (outer ring) */}
                        <circle cx="250" cy="200" r="120" stroke="url(#gradient)" strokeWidth="25" fill="none" />
                        <circle cx="250" cy="200" r="120" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
                        
                        {/* Inner bore */}
                        <circle cx="250" cy="200" r="85" fill="#1e1b4b" opacity="0.6" stroke="#c7d2fe" strokeWidth="1" />
                        
                        {/* Patient table */}
                        <rect x="160" y="270" width="180" height="12" rx="4" fill="#e0e7ff" opacity="0.6" />
                        <rect x="180" y="265" width="140" height="5" rx="2" fill="#c7d2fe" opacity="0.4" />
                        
                        {/* Head silhouette on table */}
                        <ellipse cx="250" cy="258" rx="30" ry="15" fill="#a5b4fc" opacity="0.5" />
                        
                        {/* Control panel */}
                        <rect x="380" y="230" width="100" height="50" rx="8" fill="#c7d2fe" opacity="0.3" />
                        <rect x="385" y="235" width="90" height="15" rx="3" fill="#a5b4fc" opacity="0.4" />
                        <circle cx="400" cy="260" r="4" fill="#4ade80" opacity="0.8" />
                        <circle cx="415" cy="260" r="4" fill="#fbbf24" opacity="0.8" />
                        <circle cx="430" cy="260" r="4" fill="#ef4444" opacity="0.8" />
                        
                        {/* Magnetic field lines */}
                        <path d="M130 200 Q130 130 180 120" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="4 4" />
                        <path d="M370 200 Q370 130 320 120" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="4 4" />
                        <path d="M130 200 Q130 270 180 280" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="4 4" />
                        <path d="M370 200 Q370 270 320 280" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="4 4" />
                        
                        {/* Heart beat line on monitor */}
                        <path d="M400 245 L405 245 L408 240 L412 250 L415 245 L420 245" stroke="#4ade80" strokeWidth="1.5" fill="none" />
                        
                        {/* Gradient definitions */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" />
                                <stop offset="50%" stopColor="#818cf8" />
                                <stop offset="100%" stopColor="#c084fc" />
                            </linearGradient>
                            <radialGradient id="glow">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        
                        {/* Glow effect */}
                        <circle cx="250" cy="200" r="140" fill="url(#glow)" />
                        
                        {/* Tech dots */}
                        <circle cx="125" cy="200" r="3" fill="#60a5fa" opacity="0.8" />
                        <circle cx="375" cy="200" r="3" fill="#60a5fa" opacity="0.8" />
                        <circle cx="250" cy="80" r="3" fill="#c084fc" opacity="0.8" />
                        
                        {/* Scan line animation */}
                        <line x1="170" y1="200" x2="330" y2="200" stroke="#60a5fa" strokeWidth="2" opacity="0.8">
                            <animate attributeName="y" from="120" to="280" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                        </line>
                    </svg>
                    
                    {/* Badge overlay */}
                    <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-blue-600 shadow-lg">
                        ✨ 3T MRI
                    </div>
                    
                    {/* Bottom badge */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 text-xs text-white whitespace-nowrap shadow-lg">
                        🧠 Ultra-High Resolution • 70cm Wide Bore
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    {/* Wave separator */}
    <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="relative w-full h-auto text-slate-50">
            <path fill="currentColor" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
    </div>
</section>


    

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .animate-fade-in-up {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default MRIService;