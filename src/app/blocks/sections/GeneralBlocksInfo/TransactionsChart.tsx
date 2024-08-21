'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { inter } from '@/styles/theme';
import { formatNumber } from '@/helpers';

// bypass SSR in order to get rid of "window is not defined" error
const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

type TransactionData = {
  epochIndex: number;
  transactionsNum: number;
};

interface TransactionsChartProps {
  data: TransactionData[];
}

export const TransactionsChart: React.FC<TransactionsChartProps> = ({ data }) => {
  const [options, setOptions] = useState({
    chart: {
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
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
          colors: 'white'
        },
      },
      title: {
        text: 'Epoch Index',
        style: {
          color: 'white',
          fontFamily: inter.style.fontFamily,
          fontWeight: 400
        }
      },
      axisBorder: {
        show: true,
        color: 'rgba(255, 255, 255, 0.75)'
      },
      axisTicks: {
        show: true,
        color: 'rgba(255, 255, 255, 0.75)'
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: 'white'
        }
      },
      title: {
        text: 'Number of Transactions',
        style: {
          color: 'white',
          fontFamily: inter.style.fontFamily,
          fontWeight: 400
        }
      },
      axisBorder: {
        show: true,
        color: 'rgba(255, 255, 255, 0.75)'
      },
      axisTicks: {
        show: true,
        color: 'rgba(255, 255, 255, 0.75)'
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        formatter: (value: string) => `Epoch ${value}`
      },
      y: {
        formatter: (value: string) => `Epoch ${formatNumber(value)}`
      }
    },
    legend: {
      horizontalAlign: 'left',
      labels: {
        colors: 'rgba(255, 255, 255, 0.75)'
      }
    }
  });

  const [series, setSeries] = useState([{
    name: 'Transaction Volume',
    data: data.map(item => ({
      x: item.epochIndex,
      y: item.transactionsNum
    }))
  }]);

  // @ts-ignore
  return <ApexCharts options={options} series={series} type="area" height={350} />;
}
