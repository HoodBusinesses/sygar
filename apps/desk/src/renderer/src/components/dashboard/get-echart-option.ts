type PieItemsType = {
  label: string
  value: number
  color: string
}[]

export const getPieChartOption = (items: PieItemsType): echarts.EChartsOption => ({
  tooltip: {
    trigger: 'item',
    show: false
  },
  series: [
    {
      name: 'Simulation Result',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false
        },
        focus: 'none'
      },
      labelLine: {
        show: false
      },
      data: items.map((item) => ({ value: item.value, name: item.label })),
      color: items.map((item) => item.color)
    }
  ]
})

export type LineItemsType = {
  series: {
    name: string
    data: number[]
  }[]
  yData: string[]
}

export const getBarsChartOption = (options: LineItemsType): echarts.EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: options.yData
  },
  series: options.series.map((item) => ({
    name: item.name,
    type: 'bar',
    stack: 'total',
    label: {
      show: true
    },
    emphasis: {
      focus: 'series'
    },
    data: item.data
  }))
})
