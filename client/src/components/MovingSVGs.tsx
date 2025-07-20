import React from 'react';

export const TruckSVG: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-move-box">
      {/* Truck Body */}
      <rect x="10" y="30" width="40" height="25" fill="currentColor" rx="2" />
      <rect x="50" y="35" width="25" height="20" fill="currentColor" rx="2" />
      
      {/* Truck Windows */}
      <rect x="52" y="37" width="8" height="8" fill="white" rx="1" />
      <rect x="62" y="37" width="8" height="8" fill="white" rx="1" />
      
      {/* Wheels */}
      <circle cx="20" cy="60" r="6" fill="#333" />
      <circle cx="20" cy="60" r="3" fill="#666" />
      <circle cx="65" cy="60" r="6" fill="#333" />
      <circle cx="65" cy="60" r="3" fill="#666" />
      
      {/* Cargo */}
      <rect x="15" y="25" width="6" height="6" fill="var(--brand-orange)" rx="1" />
      <rect x="25" y="25" width="6" height="6" fill="var(--brand-green)" rx="1" />
      <rect x="35" y="25" width="6" height="6" fill="var(--brand-orange)" rx="1" />
    </g>
  </svg>
);

export const BoxesSVG: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-float">
      {/* Box 1 */}
      <rect x="10" y="40" width="20" height="20" fill="var(--brand-orange)" rx="2" />
      <rect x="12" y="42" width="16" height="3" fill="white" opacity="0.7" />
      <rect x="12" y="47" width="16" height="3" fill="white" opacity="0.7" />
      
      {/* Box 2 */}
      <rect x="40" y="30" width="20" height="20" fill="var(--brand-green)" rx="2" />
      <rect x="42" y="32" width="16" height="3" fill="black" opacity="0.8" />
      <rect x="42" y="37" width="16" height="3" fill="black" opacity="0.8" />
      
      {/* Box 3 */}
      <rect x="70" y="35" width="20" height="20" fill="var(--brand-orange)" rx="2" />
      <rect x="72" y="37" width="16" height="3" fill="white" opacity="0.7" />
      <rect x="72" y="42" width="16" height="3" fill="white" opacity="0.7" />
      
      {/* Fragile symbol */}
      <text x="50" y="43" fontSize="12" fill="black" textAnchor="middle">📦</text>
    </g>
  </svg>
);

export const HouseSVG: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-pulse-custom">
      {/* House Base */}
      <rect x="20" y="50" width="60" height="40" fill="currentColor" rx="2" />
      
      {/* Roof */}
      <polygon points="50,20 15,50 85,50" fill="var(--brand-orange)" />
      
      {/* Door */}
      <rect x="45" y="65" width="10" height="25" fill="white" rx="1" />
      <circle cx="52" cy="77" r="1" fill="currentColor" />
      
      {/* Windows */}
      <rect x="25" y="60" width="12" height="12" fill="white" rx="1" />
      <rect x="63" y="60" width="12" height="12" fill="white" rx="1" />
      
      {/* Window frames */}
      <line x1="31" y1="60" x2="31" y2="72" stroke="currentColor" strokeWidth="1" />
      <line x1="25" y1="66" x2="37" y2="66" stroke="currentColor" strokeWidth="1" />
      <line x1="69" y1="60" x2="69" y2="72" stroke="currentColor" strokeWidth="1" />
      <line x1="63" y1="66" x2="75" y2="66" stroke="currentColor" strokeWidth="1" />
    </g>
  </svg>
);

export const ArrowSVG: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-bounce-custom">
      <path 
        d="M20 50 L60 50 M60 50 L50 40 M60 50 L50 60" 
        stroke="var(--brand-orange)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="75" cy="50" r="8" fill="var(--brand-green)" />
    </g>
  </svg>
);

export const CheckmarkSVG: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="var(--brand-green)" />
    <path 
      d="M30 50 L45 65 L70 35" 
      stroke="black" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ProgressTruckSVG: React.FC<{ progress: number; className?: string }> = ({ 
  progress, 
  className = "w-20 h-12" 
}) => (
  <svg className={className} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Road */}
    <rect x="0" y="70" width="200" height="10" fill="#666" />
    <rect x="0" y="75" width="200" height="2" fill="white" opacity="0.8" />
    
    {/* Progress line */}
    <rect x="0" y="80" width={200 * (progress / 100)} height="4" fill="var(--brand-green)" />
    
    {/* Truck */}
    <g transform={`translate(${Math.max(0, Math.min(160, (progress / 100) * 160))}, 0)`}>
      <rect x="10" y="40" width="30" height="20" fill="var(--brand-orange)" rx="2" />
      <rect x="40" y="45" width="20" height="15" fill="var(--brand-orange)" rx="2" />
      <rect x="42" y="47" width="6" height="6" fill="white" rx="1" />
      <rect x="50" y="47" width="6" height="6" fill="white" rx="1" />
      <circle cx="20" cy="65" r="5" fill="#333" />
      <circle cx="50" cy="65" r="5" fill="#333" />
    </g>
    
    {/* Progress text */}
    <text x="100" y="95" fontSize="12" fill="currentColor" textAnchor="middle">
      {Math.round(progress)}% Complété
    </text>
  </svg>
);

export const MovingAnimation: React.FC<{ className?: string }> = ({ className = "w-32 h-20" }) => (
  <div className={className}>
    <div className="relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 animate-move-box">
        <TruckSVG className="w-16 h-12" />
      </div>
      <div className="absolute top-2 right-4 animate-float">
        <BoxesSVG className="w-8 h-8" />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <ArrowSVG className="w-6 h-6" />
      </div>
    </div>
  </div>
);