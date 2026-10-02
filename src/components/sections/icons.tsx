/* Small inline icons for buttons and links, drawn in the same line style as the manual. */

interface IconProps {
  className?: string;
  size?: number;
}

export const ArrowIcon = ({ className, size = 22 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <path d="M3 9.6 H13.5 V4.5 L21.5 12 L13.5 19.5 V14.4 H3 Z" fill="currentColor" />
  </svg>
);

export const ArrowUpIcon = ({ className, size = 22 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <path d="M9.6 21 V10.5 H4.5 L12 2.5 L19.5 10.5 H14.4 V21 Z" fill="currentColor" />
  </svg>
);

export const ExternalIcon = ({ className, size = 18 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <path
      d="M10 5 H5 V19 H19 V14 M13 4 H20 V11 M20 4 L11 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkedInIcon = ({ className, size = 22 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <path d="M7.5 10.5 V17 M7.5 7 V7.2 M11.5 17 V10.5 M11.5 13.2 C11.5 11.5 12.8 10.4 14.3 10.4 C15.8 10.4 16.8 11.4 16.8 13.2 V17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const GitHubIcon = ({ className, size = 22 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <path
      d="M9 19.5 C5 20.8 5 17.5 3.5 17 M14.8 21.5 V18 C14.9 17 14.6 16.1 14 15.4 C16.8 15.1 19.6 14 19.6 9.3 C19.6 8.1 19.1 6.9 18.3 6 C18.7 5 18.6 3.8 18.2 2.8 C18.2 2.8 17.1 2.5 14.8 4 C12.9 3.5 10.9 3.5 9 4 C6.7 2.5 5.6 2.8 5.6 2.8 C5.2 3.8 5.1 5 5.5 6 C4.7 6.9 4.2 8.1 4.2 9.3 C4.2 14 7 15.1 9.8 15.4 C9.2 16.1 8.9 17 9 18 V21.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
