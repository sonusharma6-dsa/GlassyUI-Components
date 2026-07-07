import React from 'react';

const shimmerStyle = `
@keyframes glassy-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.glassy-shimmer-element {
  animation: glassy-shimmer 1.8s infinite linear;
}
`;

const Shimmer: React.FC = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: shimmerStyle }} />
    <div className='absolute inset-0 -translate-x-full glassy-shimmer-element bg-gradient-to-r from-transparent via-white/10 to-transparent' />
  </>
);

const baseGlassClasses =
  'backdrop-filter backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative shadow-lg';

export const GlassySkeletonText: React.FC<{
  width?: string;
  height?: string;
  circle?: boolean;
  className?: string;
}> = ({ width = '100%', height = '1rem', circle = false, className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-white/10 ${circle ? 'rounded-full' : 'rounded'} ${className}`}
      style={{ width, height }}
    >
      <Shimmer />
    </div>
  );
};

export const GlassySkeletonCard: React.FC = () => {
  return (
    <div className={`${baseGlassClasses} p-6 w-full max-w-sm`}>
      <Shimmer />
      <div className='w-full h-40 bg-white/10 rounded-xl mb-4 relative overflow-hidden'>
        <Shimmer />
      </div>
      <GlassySkeletonText width='70%' height='1.5rem' className='mb-3' />
      <GlassySkeletonText width='100%' className='mb-2' />
      <GlassySkeletonText width='90%' className='mb-2' />
      <GlassySkeletonText width='40%' />
    </div>
  );
};

export const GlassySkeletonProfile: React.FC = () => {
  return (
    <div
      className={`${baseGlassClasses} p-6 w-full max-w-sm flex items-center gap-4`}
    >
      <Shimmer />
      <div className='relative overflow-hidden'>
        <GlassySkeletonText width='3.5rem' height='3.5rem' circle />
      </div>
      <div className='flex-grow flex flex-col gap-2'>
        <GlassySkeletonText width='60%' height='1.2rem' />
        <GlassySkeletonText width='90%' height='0.8rem' />
      </div>
    </div>
  );
};

export const GlassySkeletonTable: React.FC = () => {
  return (
    <div className={`${baseGlassClasses} p-6 w-full max-w-2xl`}>
      <Shimmer />
      <div className='flex justify-between border-b border-white/10 pb-4 mb-4'>
        <GlassySkeletonText width='20%' height='1.2rem' />
        <GlassySkeletonText width='30%' height='1.2rem' />
        <GlassySkeletonText width='15%' height='1.2rem' />
      </div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className='flex justify-between py-3 border-b border-white/5 last:border-0'
        >
          <GlassySkeletonText width='25%' height='0.9rem' />
          <GlassySkeletonText width='40%' height='0.9rem' />
          <GlassySkeletonText width='10%' height='0.9rem' />
        </div>
      ))}
    </div>
  );
};
