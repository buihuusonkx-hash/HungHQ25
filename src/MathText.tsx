/**
 * MathText – Component render văn bản có chứa công thức LaTeX
 * Dùng $...$ cho inline math, $$...$$ cho display math
 *
 * Ví dụ: <MathText text="Tính $\int_0^1 x^2\,dx$" />
 */
import React, { useEffect, useRef } from 'react';

// Khai báo KaTeX toàn cục (load từ CDN trong index.html)
declare global {
  interface Window {
    katex?: {
      renderToString: (tex: string, opts?: Record<string, unknown>) => string;
    };
    renderMathInElement?: (el: HTMLElement, opts?: Record<string, unknown>) => void;
  }
}

interface MathTextProps {
  text: string;
  className?: string;
  block?: boolean; // true = display mode ($$), false = inline ($)
}

/**
 * Render một đoạn văn bản có thể chứa $...$ hoặc $$...$$
 */
export function MathText({ text, className = '', block = false }: MathTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Nếu KaTeX auto-render đã load từ CDN → dùng luôn
    if (window.renderMathInElement) {
      window.renderMathInElement(ref.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$',  right: '$',  display: false },
        ],
        throwOnError: false,
      });
    }
  }, [text]);

  if (block) {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`math-display overflow-x-auto ${className}`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  return (
    <span
      ref={ref}
      className={`math-text ${className}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

/**
 * Tiện ích: chuyển chuỗi có $...$ thành HTML span an toàn
 * Dùng khi không cần React component
 */
export function parseMathText(text: string): string {
  if (!text) return '';
  // Trả về nguyên bản – KaTeX auto-render sẽ xử lý qua useEffect
  return text;
}

/**
 * Hook: cưỡng bức re-render KaTeX sau khi nội dung thay đổi
 */
export function useMathRender(deps: React.DependencyList = []) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && window.renderMathInElement) {
      window.renderMathInElement(ref.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$',  right: '$',  display: false },
        ],
        throwOnError: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

export default MathText;
