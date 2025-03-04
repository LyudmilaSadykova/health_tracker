export const optionsChart = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: true,
        stacked: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: <'top' | 'bottom' | undefined>('bottom')
      },
      title: {
        display: false,
      }
    },
    indexAxis: <'y' | 'x' | undefined>('y'),
    barThickness: 20
  };