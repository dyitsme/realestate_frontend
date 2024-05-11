import { CategoryScale, Chart } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale)

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Price factors',
    },
  },
}

const BarChart = () => {
    return (
    <div>
      <Bar
        options={options}
        data={{
          labels: ['A', 'B', 'C'],
          datasets: [
            {
              label: 'Revenue', 
              data: [200, 300, 400]
            }
          ]
        }}
      >
      </Bar>
    </div>
  )
}

export default BarChart