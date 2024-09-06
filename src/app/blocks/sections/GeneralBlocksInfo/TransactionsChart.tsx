'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { inter } from '@/styles/theme';
import { formatNumber, roundToNearest } from '@/helpers';
import { RecentBlockStats } from '@/definitions';

// bypass SSR in order to get rid of "window is not defined" error
const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

type TxPerEpoch = {
  epochIndex: number;
  txNumber: number;
}

const getChartData = (stats: RecentBlockStats): TxPerEpoch[] => {
  return Object.entries(stats).reduce((acc: TxPerEpoch[], curr) => {
    const txPerEpoch: TxPerEpoch = {
      epochIndex: Number(curr[0]),
      txNumber: Number(curr[1].totalTxsNumber)
    }
    acc.push(txPerEpoch);
    return acc;
  }, []);
}

interface TransactionsChartProps {
  recentBlockStats: RecentBlockStats;
}

export const TransactionsChart: React.FC<TransactionsChartProps> = ({ recentBlockStats }) => {
  const data = getChartData(recentBlockStats);

  const YMaxValue = Math.max(...data.map(val => val.txNumber)) * 1.025;
  const YMaxAxiosValue = roundToNearest(YMaxValue, YMaxValue > 1000 ? 1000 : 100);

  const [options, setOptions] = useState({
    chart: {
      type: 'area',
      height: 275,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      offsetY: -20,
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 1.5,
      colors: ['white']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: '#7AEEE5',
            opacity: 1
          },
          {
            offset: 100,
            color: '#7AEEE5',
            opacity: 0
          }
        ]
      }
    },
    grid: {
      show: true,
      borderColor: 'rgba(254, 254, 254, 0.1)',
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: 'category',
      categories: data.map(item => item.epochIndex),
      labels: {
        style: {
          colors: 'rgba(254, 254, 254, 0.2)',
          fontFamily: inter.style.fontFamily,
          fontWeight: 300,
          fontSize: '14px',
        },
        formatter: (value: number) => value + 1
      },
      axisBorder: {
        show: true,
        color: 'rgba(254, 254, 254, 0.2)'
      },
      axisTicks: {
        show: true,
        color: 'rgba(254, 254, 254, 0.2)'
      }
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: YMaxAxiosValue,
      labels: {
        style: {
          colors: 'white',
          fontFamily: inter.style.fontFamily,
          fontWeight: 300,
          fontSize: '14px',
        },
        formatter: (value: number) => formatNumber(value)
      },
      axisBorder: {
        show: true,
        color: 'rgba(254, 254, 254, 0.2)'
      },
      axisTicks: {
        show: true,
        color: 'rgba(254, 254, 254, 0.2)'
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        color: 'white',
        fontSize: '14px',
        fontFamily: inter.style.fontFamily,
        fontWeight: 300
      },
      x: {
        formatter: (value: string) => `Epoch ${value}`
      },
      y: {
        formatter: (value: string) => formatNumber(value)
      }
    },
    markers: {
      size: 0,
      colors: ['rgba(92, 208, 199, 1)'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
        sizeOffset: 3
      }
    }
  });

  const [series, setSeries] = useState([{
    name: 'Transactions amount',
    data: data.map(item => ({
      x: item.epochIndex,
      y: item.txNumber
    })),
    color: 'rgba(92, 208, 199, 1)'
  }]);

  // @ts-ignore
  return <ApexCharts options={options} series={series} type="area" height={275} />;
}
