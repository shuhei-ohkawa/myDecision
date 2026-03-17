interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  color = '#3B82F6',
  height = 10,
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showLabel && (
            <span className="text-sm font-bold" style={{ color }}>
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full rounded-full bg-gray-200 overflow-hidden"
        style={{ height }}
      >
        <div
          className={`h-full rounded-full ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${clamped}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
