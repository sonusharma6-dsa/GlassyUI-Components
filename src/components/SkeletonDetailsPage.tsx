import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import PageShell from './PageShell';
import {
  GlassySkeletonCard,
  GlassySkeletonProfile,
  GlassySkeletonTable,
} from './GlassySkeleton';

const SkeletonDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getGlassyClasses = (opacity = 10) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
  border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(
        () => setCopiedStates(prev => ({ ...prev, [key]: false })),
        2000,
      );
    });
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 text-white`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  const handleBackToComponents = () => {
    navigate('/components');
  };

  const cardCode = `import { GlassySkeletonCard } from './components/GlassySkeleton';

// In JSX:
<GlassySkeletonCard />`;

  const profileCode = `import { GlassySkeletonProfile } from './components/GlassySkeleton';

// In JSX:
<GlassySkeletonProfile />`;

  const tableCode = `import { GlassySkeletonTable } from './components/GlassySkeleton';

// In JSX:
<GlassySkeletonTable />`;

  return (
    <PageShell>
      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={handleBackToComponents}
          className={`flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-opacity-20 text-white`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1 className='text-6xl font-bold mb-8 text-white relative z-10'>
        Glassmorphic Skeleton Loader Components
      </h1>
      <p className='text-xl mb-8 text-gray-100'>
        A selection of premium, customizable skeleton placeholder loaders with a
        shimmering glass effect.
      </p>

      {/* Profile Skeleton */}
      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>Profile Loader</h2>
        <div className={`${getGlassyClasses(5)} p-8 mb-4 flex justify-center`}>
          <GlassySkeletonProfile />
        </div>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
            {profileCode}
          </pre>
          <CopyButton text={profileCode} codeKey='profileCode' />
        </div>
      </section>

      {/* Card Skeleton */}
      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>Card Loader</h2>
        <div className={`${getGlassyClasses(5)} p-8 mb-4 flex justify-center`}>
          <GlassySkeletonCard />
        </div>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
            {cardCode}
          </pre>
          <CopyButton text={cardCode} codeKey='cardCode' />
        </div>
      </section>

      {/* Table Skeleton */}
      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>Table/List Loader</h2>
        <div className={`${getGlassyClasses(5)} p-8 mb-4 flex justify-center`}>
          <GlassySkeletonTable />
        </div>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
            {tableCode}
          </pre>
          <CopyButton text={tableCode} codeKey='tableCode' />
        </div>
      </section>
    </PageShell>
  );
};

export default SkeletonDetailsPage;
