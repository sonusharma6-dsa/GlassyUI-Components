import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import PageShell from './PageShell';
import GlassDivider from './GlassDivider';

const DividerDetailsPage: React.FC = () => {
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

  const basicUsageCode = `<GlassDivider />`;

  const labelUsageCode = `<GlassDivider label="OR" />`;

  const verticalUsageCode = `<div className="flex h-32 items-center">
  <div className="text-white">Left Side</div>
  <GlassDivider orientation="vertical" />
  <div className="text-white">Right Side</div>
</div>`;

  const customStyleCode = `<GlassDivider 
  className="border-dashed" 
  style={{ margin: '3rem 0', opacity: 0.8 }} 
/>`;

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
        Glassmorphic Divider Component
      </h1>
      <p className='text-xl mb-8 text-gray-100'>
        A glassmorphism-styled separator component to visually divide content
        sections.
      </p>

      {/* Horizontal Divider Section */}
      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>
          Horizontal Divider (Default)
        </h2>
        <div
          className={`${getGlassyClasses(5)} p-8 mb-4 flex flex-col justify-center min-h-[100px]`}
        >
          <div className='text-sm text-white/50 mb-2'>Above section</div>
          <GlassDivider />
          <div className='text-sm text-white/50 mt-2'>Below section</div>
        </div>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
            {basicUsageCode}
          </pre>
          <CopyButton text={basicUsageCode} codeKey='basicUsage' />
        </div>
      </section>

      {/* Divider with Label Section */}
      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>Divider with Label</h2>
        <div
          className={`${getGlassyClasses(5)} p-8 mb-4 flex flex-col justify-center min-h-[100px]`}
        >
          <div className='text-sm text-white/50 mb-2'>Section 1</div>
          <GlassDivider label='OR' />
          <div className='text-sm text-white/50 mt-2'>Section 2</div>
        </div>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
            {labelUsageCode}
          </pre>
          <CopyButton text={labelUsageCode} codeKey='labelUsage' />
        </div>
      </section>

      {/* Vertical Divider Section */}
      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>Vertical Divider</h2>
        <div
          className={`${getGlassyClasses(5)} p-8 mb-4 flex justify-center items-center h-40`}
        >
          <div className='text-sm text-white/70'>Feature A</div>
          <GlassDivider orientation='vertical' />
          <div className='text-sm text-white/70'>Feature B</div>
          <GlassDivider orientation='vertical' />
          <div className='text-sm text-white/70'>Feature C</div>
        </div>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
            {verticalUsageCode}
          </pre>
          <CopyButton text={verticalUsageCode} codeKey='verticalUsage' />
        </div>
      </section>

      {/* Custom Styles Section */}
      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-white relative z-10`}
      >
        <h2 className='text-3xl font-bold mb-4'>Custom Margin & Style</h2>
        <div
          className={`${getGlassyClasses(5)} p-8 mb-4 flex flex-col justify-center min-h-[100px]`}
        >
          <div className='text-sm text-white/50'>Custom space spacer</div>
          <GlassDivider
            className='border-dashed opacity-50'
            style={{ margin: '2rem 0' }}
          />
          <div className='text-sm text-white/50'>End of content</div>
        </div>
        <div className='relative'>
          <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:p-2 max-sm:text-[0.55rem]'>
            {customStyleCode}
          </pre>
          <CopyButton text={customStyleCode} codeKey='customStyle' />
        </div>
      </section>
    </PageShell>
  );
};

export default DividerDetailsPage;
