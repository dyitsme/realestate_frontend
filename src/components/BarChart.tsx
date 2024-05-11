import { CategoryScale, Chart } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale)

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 0,
	  backgroundColor: (context) => {
				const chart = context.chart;
				const { ctx, chartArea } = chart;
				if(!chartArea) {
					return null
				}
				return getGradientBackground(chart);
			},
		borderColor: (context) => {
				const chart = context.chart;
				const { ctx, chartArea } = chart;
				if(!chartArea) {
					return null
				}
				return getGradientBorder(chart);
			},	
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
function getGradientBackground(chart)
{
	const {ctx, chartArea: {top, bottom, left, right}, scales: {x, y} } = chart;
	const gradientSegment = ctx.createLinearGradient(0 ,bottom, 0, top);
	
	gradientSegment.addColorStop(0, '#F87171');
	gradientSegment.addColorStop(0.5, '#F87171');
	gradientSegment.addColorStop(0.5, '#4ADE80');
	gradientSegment.addColorStop(1, '#4ADE80');
	return gradientSegment;
	
}

function getGradientBorder(chart)
{
	const {ctx, chartArea: {top, bottom, left, right}, scales: {x, y} } = chart;
	const gradientSegment = ctx.createLinearGradient(0 ,bottom, 0, top);
	
	gradientSegment.addColorStop(0, '#FECACA');
	gradientSegment.addColorStop(0.5, '#FECACA');
	gradientSegment.addColorStop(0.5, '#BBF7D0');
	gradientSegment.addColorStop(1, '#BBF7D0');
	return gradientSegment;
	
}
export default BarChart