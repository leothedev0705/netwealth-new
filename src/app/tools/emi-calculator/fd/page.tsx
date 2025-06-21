'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FDRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/tools/emi-calculator/fixed-deposit');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-slate-600">Redirecting to Fixed Deposit Calculator...</p>
    </div>
  );
} 