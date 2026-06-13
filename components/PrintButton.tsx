'use client';

export function PrintButton() {
  return (
    <button 
      className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-md bg-brand px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-brand-dark transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap no-print" 
      onClick={() => window.print()}
      type="button"
    >
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:animate-bounce flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
      <span>چاپ / دانلود PDF</span>
    </button>
  );
}
