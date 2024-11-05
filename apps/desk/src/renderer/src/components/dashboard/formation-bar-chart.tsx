import { useMemo } from 'react'
import Chart from './echart'
import { getBarsChartOption, LineItemsType } from './get-echart-option'

export default function FormationBarChart() {
  const options: LineItemsType = useMemo(
    () => ({
      yData: ['cpp', 'java', 'rust', 'frontend', 'devops', 'Ecom', 'Mathematics'],
      series: [
        {
          name: 'Active participants',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Abcent participants',
          data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
          name: 'Total participants',
          data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
      ]
    }),
    []
  )

  const options2: LineItemsType = useMemo(
    () => ({
      yData: ['cpp', 'java', 'rust', 'frontend', 'devops', 'Ecom', 'Mathematics'],
      series: [
        {
          name: 'Charges',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Revenue',
          data: [150, 212, 201, 154, 190, 330, 410]
        }
      ]
    }),
    []
  )

  const options3: LineItemsType = useMemo(
    () => ({
      yData: ['cpp', 'java', 'rust', 'frontend', 'devops', 'Ecom', 'Mathematics'],
      series: [
        {
          name: 'Completed Tasks',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Tasks in progress',
          data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
          name: 'Blocked Tasks',
          data: [150, 212, 201, 154, 190, 330, 410]
        }
      ]
    }),
    []
  )

    const options4: LineItemsType = useMemo(
      () => ({
        yData: ['cpp', 'java', 'rust', 'frontend', 'devops', 'Ecom', 'Mathematics'],
        series: [
          {
            name: '0 Star',
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: '1 Star',
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: '2 stars',
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: '3 stars',
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: '4 stars',
            data: [150, 212, 201, 154, 190, 330, 410]
          }
        ]
      }),
      []
    )
  return (
    <div className="grid grid-cols-2 gap-4">
      <Chart
        chartOptions={getBarsChartOption(options)}
        className={'w-full h-[400px] border-2 rounded-lg '}
      />
      <Chart
        chartOptions={getBarsChartOption(options2)}
        className={'w-full h-[400px] border-2 rounded-lg '}
      />
      <Chart
        chartOptions={getBarsChartOption(options3)}
        className={'w-full  border-2 rounded-lg  h-[400px]'}
      />
      <Chart
        chartOptions={getBarsChartOption(options4)}
        className={'w-full border-2 rounded-lg  h-[400px]'}
      />
    </div>
  )
}
