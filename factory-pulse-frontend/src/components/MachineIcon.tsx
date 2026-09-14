interface Props {
  type: string;
}

export function MachineIcon({ type }: Props) {
  const common = {
    width: 32,
    height: 32,
    stroke: 'currentColor',
    strokeWidth: 1.8,
    fill: 'none',
  };

  if (type === 'lifter') {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path
          d="M12 3v14M7 8l5-5 5 5M5 21h14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === 'sorter') {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path
          d="M12 3v6M12 9l-6 12M12 9l6 12M4 21h4M16 21h4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // conveyor
  return (
    <svg viewBox="0 0 24 24" {...common}>
      <rect x="2" y="9" width="20" height="6" rx="3" />
      <circle cx="7" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="17" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
