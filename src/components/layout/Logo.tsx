import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/assets/logo.png"
              alt="NetWealth India Logo"
      width={32}
      height={32}
      className="h-8 w-8 object-contain"
      priority
    />
  );
};

export default Logo; 