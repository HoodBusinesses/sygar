import { useMemo } from 'react'
import PieChart from './pie-chart'

export default function FormationsPieChart() {
  const pieItems = useMemo(
    () => [
      {
        label: 'Total formations',
        value: 150,
        color: '#3b82f6'
      },
      {
        label: 'Finished formations',
        value: 80,
        color: '#6d28d9'
      },
      {
        label: 'formations in progress',
        value: 70,
        color: '#f59e0b'
      },
    ],
    []
  )
  return <PieChart name="Formations" items={pieItems} />
}
