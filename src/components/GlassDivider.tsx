import React from 'react';

interface GlassDividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

const GlassDivider: React.FC<GlassDividerProps> = ({
  orientation = 'horizontal',
  label,
  className = '',
  style,
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      role='separator'
      aria-orientation={orientation}
      className={`flex items-center justify-center ${
        isHorizontal ? 'w-full my-6 flex-row' : 'h-full mx-6 flex-col'
      } ${className}`}
      style={style}
    >
      {/* First segment of the line */}
      <div
        className={`backdrop-filter backdrop-blur-sm bg-white/10 border-white/10 ${
          isHorizontal
            ? 'flex-grow h-[1px] border-t'
            : 'flex-grow w-[1px] border-l'
        }`}
      />

      {/* Label (if present) */}
      {label && (
        <span
          className={`text-xs font-semibold text-white/80 tracking-wider backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 px-3 py-1 rounded-full shadow-sm select-none ${
            isHorizontal ? 'mx-3' : 'my-3'
          }`}
        >
          {label}
        </span>
      )}

      {/* Second segment of the line */}
      {label && (
        <div
          className={`backdrop-filter backdrop-blur-sm bg-white/10 border-white/10 ${
            isHorizontal
              ? 'flex-grow h-[1px] border-t'
              : 'flex-grow w-[1px] border-l'
          }`}
        />
      )}
    </div>
  );
};

export default GlassDivider;
