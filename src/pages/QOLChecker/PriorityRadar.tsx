import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import type { QOLScore } from '../../types/qol';

interface Props {
  scores: QOLScore[];
}

export default function PriorityRadar({ scores }: Props) {
  const data = scores.map((s) => ({
    subject: s.label,
    value: Math.max(0, Math.min(100, s.score)),
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: '#6b7280' }}
        />
        <Radar
          dataKey="value"
          fill="#3B82F6"
          fillOpacity={0.25}
          stroke="#3B82F6"
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
