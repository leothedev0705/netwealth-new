'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RDRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/tools/emi-calculator/recurring-deposit');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-slate-600">Redirecting to Recurring Deposit Calculator...</p>
    </div>
  );
} 