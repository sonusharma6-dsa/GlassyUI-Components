import React from 'react';
import BackToTopButton from './BackToTop';
import './PageShell.css';

interface PageShellProps {
  children: React.ReactNode;
}

const PageShell: React.FC<PageShellProps> = ({ children }) => {
  React.useEffect(() => {
    // Select all <pre> elements inside .ps-content
    const preBlocks = document.querySelectorAll('.ps-content pre');
    preBlocks.forEach(pre => {
      // Avoid duplicate buttons
      if (
        pre.querySelector('.global-copy-btn') ||
        pre.parentElement?.querySelector('button')
      )
        return;

      const preEl = pre as HTMLElement;
      preEl.style.position = 'relative';

      // Create button
      const btn = document.createElement('button');
      btn.className =
        'global-copy-btn absolute top-2 right-2 backdrop-filter backdrop-blur-xl bg-white/10 border border-white/20 p-2 hover:bg-white/30 rounded-md transition-all duration-300 z-10 text-white flex items-center justify-center';
      btn.title = 'Copy to clipboard';

      const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
      const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="m5 12 5 5L20 7"/></svg>`;

      btn.innerHTML = copyIcon;

      btn.addEventListener('click', () => {
        // Exclude the button text itself if it was copied
        const textToCopy = (preEl.innerText || '')
          .replace(/Copy|Copied!/g, '')
          .trim();

        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              btn.innerHTML = checkIcon;
              setTimeout(() => {
                btn.innerHTML = copyIcon;
              }, 2000);
            })
            .catch(err => {
              console.error('Failed to copy: ', err);
            });
        } else {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'absolute';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            btn.innerHTML = checkIcon;
            setTimeout(() => {
              btn.innerHTML = copyIcon;
            }, 2000);
          } catch (e) {
            console.error('Fallback copy failed', e);
          }
          document.body.removeChild(textarea);
        }
      });

      preEl.appendChild(btn);
    });
  }, [children]);

  return (
    <div className='page-shell'>
      {/* Animated background orbs — matches landing page */}
      <div className='ps-orb ps-orb-1' />
      <div className='ps-orb ps-orb-2' />
      <div className='ps-orb ps-orb-3' />
      <div className='ps-orb ps-orb-4' />

      {/* Subtle grid overlay */}
      <div className='ps-grid' />

      <BackToTopButton />

      {/* Page content sits above all bg layers */}
      <div className='ps-content'>{children}</div>
    </div>
  );
};

export default PageShell;
