import { useMemo } from 'react';
import PieChart from './pie-chart';

export default function UsersPieChart() {
  const pieItems = useMemo(
    () => [
      {
        label: 'Total Participants',
        value: 4231,
        color: '#3b82f6',
      },
      {
        label: 'Educated Participants',
        value: 2600,
        color: '#6d28d9',
      },
      {
        label: 'Participants in progress',
        value: 1700,
        color: '#f59e0b',
      },
      {
        label: 'Absent Participants',
        value: 331,
        color: '#d1d5db',
      },
    ],
    []
  );
  return <PieChart name={'Participants'} items={pieItems} />;
}
