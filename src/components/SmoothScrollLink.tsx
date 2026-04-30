"use client";

import type { MouseEvent, ReactNode } from "react";

type SmoothScrollLinkProps = {
  children: ReactNode;
  className?: string;
  href: `#${string}`;
};

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function SmoothScrollLink({ children, className, href }: SmoothScrollLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const target = document.querySelector(href);

    if (!target) return;

    const headerOffset = 106;
    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    const distance = targetY - startY;
    const duration = 760;
    const startTime = performance.now();

    window.history.replaceState(null, "", href);

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
