import { memo, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { cn } from '../ui/lib/utils'

const defaultOption = {
  fontFamily: 'Work Sans, sans-serif',
  animationDuration: 500,
  animationDelay: 300
}

interface ChartProps {
  chartOptions: echarts.EChartsOption
  className: string
}

const Chart = memo(({ chartOptions, className }: ChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.EChartsType>()

  useEffect(() => {
    chartRef.current = echarts.init(containerRef.current)

    chartRef.current?.setOption({
      ...defaultOption,
      ...chartOptions
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.dispose()
      }
    }
  }, [chartOptions])

  useEffect(() => {
    if (chartRef.current && containerRef.current) {
      new ResizeObserver(() => {
        chartRef.current?.resize();

        chartRef.current?.setOption({
          ...defaultOption,
          ...chartOptions
        })
      }).observe(containerRef.current)
    }
  }, [])

  return <div className={cn(className)} ref={containerRef} />
})

Chart.displayName = 'Chart'

export default Chart
