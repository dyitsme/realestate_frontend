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
  scales: {
      y: {
        ticks: {
          font: {
            size: 7,
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 8
          }
        }
      }
    }
}

const BarChart = () => {
    return (
    <div>
      <Bar
        options={options}
        data={{
          labels: ['Bedrooms', 'Floor size', 'Total Rooms','Age', 'Religion', 'Transportation'],
          datasets: [
            {
              label: 'Revenue', 
              data: [0.95, 0.798,  0.792,-0.4, -0.39, -0.31]
            }
			
          ]
        }}
      >
      </Bar>
    </div>
  )
}
/*
const BarChart = () => {
    return (
    <div>
      <Bar
        options={options}
        data={{
          labels: ['Bedrooms', 'Floor size', 'Total Rooms','Age', 'Religion', 'Transportation'],
          datasets: [
            {
              label: 'Revenue', 
              data: [0.95, 0.798,  0.792,-0.4, -0.39, -0.31]
            }
			backgroundColor: (context) => {
				const chart = context.chart;
				const { ctx, chartArea } = chart;
				if(!chartArea) {
					return null
				}
				return getGradient(chart);
			}
          ]
        }}
      >
      </Bar>
    </div>
  )
}
*/
function getGradient(chart)
{
	const {ctx, chartArea: {top, bottom, left, right}, scales: {x, y} } = chart;
	const gradientSegment = ctx.createLinearGradient(0 ,bottom, 0, top);
	
	gradientSegment.addColorStop(0, 'red');
	gradientSegment.addColorStop(0.5, 'red');
	gradientSegment.addColorStop(0.5, 'green');
	gradientSegment.addColorStop(1, 'green');
	return gradientSegment;
	
}
export default BarChart