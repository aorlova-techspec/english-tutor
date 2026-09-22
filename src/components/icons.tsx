type IconProps = { className?: string; "aria-hidden"?: boolean | "true" | "false" };

export function IconCheck({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconArrow({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconMenu({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} {...rest}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} {...rest}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function IconChevron({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconPhone({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function IconTelegram({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
      <path d="M21.94 4.1a1.5 1.5 0 0 0-2.06-.57L3.6 11.3c-.94.57-.85 1.98.13 2.44l4.3 2a1 1 0 0 1 .54.64l.9 3.1c.2.7 1.16.82 1.53.19l1.5-2.54 4.12 2.2a1 1 0 0 0 1.49-.75l2.2-13.4a1.5 1.5 0 0 0-.37-1.06Z M8.66 16.1l9.55-6.6a.4.4 0 0 0-.43-.68l-8.26 6.15-.33 1.7Z" />
    </svg>
  );
}

export function IconWhatsApp({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.4A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.13-1.47-.73-1.7-.8-.23-.1-.4-.15-.56.13-.17.25-.65.8-.8.97-.14.17-.3.18-.54.05a6.7 6.7 0 0 1-3.37-2.96c-.25-.44.25-.4.72-1.35.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.3-.22.25-.85.84-.85 2.04 0 1.2.87 2.36 1 2.52.12.17 1.72 2.63 4.17 3.68.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.46-.29Z" />
    </svg>
  );
}

export function IconStar({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
      <path d="m12 2.6 2.9 5.9 6.5.94-4.7 4.58 1.1 6.48L12 17.53l-5.8 3.07 1.1-6.48-4.7-4.58 6.5-.94Z" />
    </svg>
  );
}

export function IconChat({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

export function IconLogic({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <circle cx="12" cy="6" r="3" />
      <circle cx="5" cy="18" r="3" />
      <circle cx="19" cy="18" r="3" />
      <path d="M7.8 8.2 6.5 15" />
      <path d="M16.2 8.2 17.5 15" />
      <path d="M8 17h8" />
    </svg>
  );
}

export function IconSpark({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 7.5 13.4 11l3.1 1-3.1 1L12 16.5 10.6 13l-3.1-1 3.1-1Z" />
    </svg>
  );
}

export function IconGrowth({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <path d="M3 17 9 11l4 4 8-9" />
      <path d="M18 6h3v3" />
    </svg>
  );
}

export function IconQuestion({ className, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.2 9a2.9 2.9 0 0 1 5.6 1c0 1.6-2.8 2.2-2.8 3.6" />
      <path d="M12 17h.01" />
    </svg>
  );
}