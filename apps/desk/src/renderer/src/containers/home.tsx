import React, { useEffect, useRef } from 'react';
import withAuth from '../hoc/with-auth';
import * as echarts from 'echarts';

function Home(): JSX.Element {
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef1.current) {
      const chart1 = echarts.init(chartRef1.current);
      const option1 = {
        title: {
          text: 'ECharts example'
        },
        tooltip: {},
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E', 'F']
        },
        yAxis: {},
        series: [
          {
            name: 'Example Series',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      chart1.setOption(option1)
    }

    if (chartRef2.current) {
      const chart2 = echarts.init(chartRef2.current)

      const data = [];
      for (let i = 0; i <= 360; i++) {
        let t = (i / 180) * Math.PI;
        let r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
      }

      const option2 = {
        title: {
          text: 'Two Value-Axes in Polar'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      };

      chart2.setOption(option2);
    }
  }, []);

  return (
    <div>
      <div ref={chartRef1} style={{ width: '600px', height: '400px' }} />
      <div ref={chartRef2} style={{ width: '600px', height: '400px' }} />
    </div>
  );
}

export default withAuth(Home);