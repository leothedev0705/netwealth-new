import React from 'react';

// Placeholder SVGs - Replace with actual logos if available
const VisaLogo = () => (
  <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 text-gray-500">
    <path d="M14.64.48H9.08L5.84 12.6h-.04L2.56.48H.92L0 13.8h2.24l.48-2.88h3.32l.32 2.88h2.2l1.84-13.32h2.44L14.64.48zm-5.4 8.24l1.6-6.84.04-.96h.04l1.6 6.84.04.96h-3.28l-.04-.96zm14.12 5.08c.76 0 1.44-.16 2.04-.48l.44 2.04c-.84.4-1.84.6-2.96.6-2.8 0-4.68-1.48-4.68-3.8 0-1.76 1.16-2.96 2.96-3.64.92-.36 1.4-.64 1.4-.96 0-.4-.4-.68-.96-.68-.68 0-1.2.16-1.84.4l-.44-1.96c.72-.28 1.6-.44 2.6-.44 2.68 0 4.4 1.28 4.4 3.44 0 1.96-1.56 2.88-2.76 3.32-.8.32-1.16.56-1.16.88 0 .44.48.72 1.04.72zM32.24.48h-4.6L24.8 13.8h2.36l.6-2.52h3.44l.32 2.52h2.2L32.24.48zm-2.16 8.84h-1.4l1.6-7.8h.04l1.44 7.8h-1.68zM23.24.48h-2.2l-1.8 13.32h2.2l1.8-13.32zM41.8.48h2.24l-1 13.32h-2.12L38.2 2.88h-.04l-2.6 10.92h-2.12l2.68-13.32h2.44l1.36 9.44.04.96h.04l1.2-10.4zm7.28 9.12c.24-.72.84-2.68 1.04-3.64l.24-1.04h.04l.8 4.68h-2.12zM44.6.48l-2.6 13.32h2.16l.56-3.12h3.84l.96 3.12h2.2l-2.6-13.32H44.6z" fill="currentColor"/>
  </svg>
);
const PayPalLogo = () => (
  <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 text-gray-500">
    <path d="M9.58.66h5.14c3.17 0 5.13.86 5.82 3.28.46 1.6.2 2.86-.7 3.76-.97.97-2.43 1.36-4.13 1.36h-2.4v5.5h-3.73V.66zm3.74 6.9c1.3 0 2.25-.28 2.8-.82.67-.67.82-1.5.46-2.5-.44-1.18-1.56-1.74-3.2-1.74h-1.47v5.06h1.4v0zM25.15 11.1c1.1-.84 1.75-2.1 1.8-3.7.13-2.53-1.2-3.9-3.9-3.9h-5.2v11.1h3.74V8.7h1.18c.8 0 1.25.4 1.25 1.1v0c0 .66-.4 1.05-1.14 1.05h-1.3V14.6h3.47c2.5 0 4-1.15 4.3-3.5zm-3.88-5.2c.6 0 .92.26.92.7 0 .48-.3.77-.93.77h-1.26V5.9h1.27zM33.05.66h5.14c3.17 0 5.13.86 5.82 3.28.46 1.6.2 2.86-.7 3.76-.97.97-2.43 1.36-4.13 1.36h-2.4v5.5h-3.73V.66zm3.74 6.9c1.3 0 2.25-.28 2.8-.82.67-.67.82-1.5.46-2.5-.44-1.18-1.56-1.74-3.2-1.74h-1.47v5.06h1.4v0zM45.14.66h3.74v13.9h-3.74V.66zM56.6.66l-2.96 9.1-.82 2.56h-.07l-.8-2.56-2.97-9.1h-4.1l5.9 13.9h2.7l5.93-13.9H56.6z" fill="currentColor"/>
  </svg>
);
const PayoneerLogo = () => (
  <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 text-gray-500">
    <path d="M6.49.38h4.3v13.6H6.5V.38zm10.29 0h4.3v5.9h-4.3V.38zm0 7.7h4.3v5.9h-4.3V8.08zm7.93-7.7h4.3c3.1 0 5.1.8 5.8 3.1.4 1.5.2 2.7-.7 3.6-.9.9-2.3 1.3-4 1.3h-1.4v5.6h-4.3V.38zm4.1 6.7c1.2 0 2.1-.3 2.7-.8.6-.6.8-1.4.4-2.4-.4-1.1-1.5-1.7-3.1-1.7h-1.4v4.9h1.4zm7.9-6.7h4.3c3.1 0 5.1.8 5.8 3.1.4 1.5.2 2.7-.7 3.6-.9.9-2.3 1.3-4 1.3h-1.4v5.6h-4.3V.38zm4.1 6.7c1.2 0 2.1-.3 2.7-.8.6-.6.8-1.4.4-2.4-.4-1.1-1.5-1.7-3.1-1.7h-1.4v4.9h1.4zm8.01 2.7c-.3-2.5-2.1-4-4.5-4-2.9 0-4.9 1.9-4.9 4.8 0 2.9 2 4.8 4.9 4.8 1.7 0 3-.7 4-2l-3.6-1.3c-.5.6-1.1.9-1.8.9-.9 0-1.5-.5-1.7-1.3h5.6zm-4.5-2.2c1 0 1.6.4 1.9 1h-3.8c.2-.6.8-1 1.9-1zm8.81-7.1H58v13.6h-4.29V.38z" fill="currentColor"/>
  </svg>
);

const Partners = () => {
  return (
    // Use Hero section's container settings for alignment
    <section className="bg-white py-12 px-6">
      <div className="container mx-auto">
        <h3 className="text-sm font-semibold text-gray-600 mb-6 text-center md:text-left">We&apos;re proud to collaborate with leading financial institutions and technology providers to offer you the best solutions.</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          <VisaLogo />
          <PayPalLogo />
          <PayoneerLogo />
        </div>
      </div>
    </section>
  );
};

export default Partners; 