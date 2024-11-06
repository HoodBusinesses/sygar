import { useMemo } from 'react'
import PieChart from './pie-chart'

export default function TasksPieChart() {
  const pieItems = useMemo(
    () => [
      {
        label: 'Total Tasks',
        value: 150,
        color: '#3b82f6'
      },
      {
        label: 'Finished Tasks',
        value: 80,
        color: '#6d28d9'
      },
      {
        label: 'Tasks in progress',
        value: 70,
        color: '#f59e0b'
      },
      {
        label: 'Blocked Tasks',
        value: 30,
        color: '#d1d5db'
      }
    ],
    []
  )
  return <PieChart name={'Tasks'} items={pieItems} />
}
