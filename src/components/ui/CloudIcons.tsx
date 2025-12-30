import React from "react";

export const Cloud1 = ({ className }: { className?: string }) => (
  // Nuvem Grande e "Gordinha"
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5,19c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C19,18.33,18.33,19,17.5,19z" opacity="0.5"/>
    <path d="M6.5,19C4.01,19,2,16.99,2,14.5S4.01,10,6.5,10c0.36,0,0.71,0.04,1.05,0.12C8.36,6.67,11.45,4,15,4c4.42,0,8,3.58,8,8
    c0,1.06-0.21,2.07-0.58,3C22.69,15.35,22.9,15.66,23,16c0,1.66-1.34,3-3,3H6.5z"/>
  </svg>
);

export const Cloud2 = ({ className }: { className?: string }) => (
  // Nuvem Comprida (Para passar rápido)
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19,18H6c-2.21,0-4-1.79-4-4s1.79-4,4-4h1v-1c0-2.76,2.24-5,5-5s5,2.24,5,5v1h2c1.66,0,3,1.34,3,3S20.66,18,19,18z"/>
  </svg>
);

export const Cloud3 = ({ className }: { className?: string }) => (
  // Nuvem Pequena (Para detalhes de fundo)
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.35,10.04C18.67,6.59,15.64,4,12,4C9.11,4,6.6,5.64,5.35,8.04C2.34,8.36,0,10.91,0,14c0,3.31,2.69,6,6,6h13
    c2.76,0,5-2.24,5-5C24,12.36,21.93,10.12,19.35,10.04z"/>
  </svg>
);