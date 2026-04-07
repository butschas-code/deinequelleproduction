/** Max. 3 einfache Linien-Icons — bewusst kein Icon-Set-Look */

export function IconYoga({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M6 24c4-8 8-12 10-12s6 4 10 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M16 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="4" r="2" fill="currentColor" />
    </svg>
  );
}

export function IconKinesiologie({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M4 16h24M16 4v24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconSport({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M6 22c3-6 7-10 10-10s7 4 10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M10 10l4 4M22 10l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
