import React from 'react';
import { Chart as ChartJS, CategoryScale, PointElement, Title, Tooltip, Legend, BarController, BarElement } from 'chart.js';

import 'chartjs-adapter-luxon';

import annotationPlugin from 'chartjs-plugin-annotation';

import { theme } from '../../themes/theme'

//----------------------------------------------------------------



const MltAxChart = () => {


    ChartJS.register(
        CategoryScale,
        PointElement,
        BarElement,
        BarController,
        annotationPlugin,
        Title,
        Tooltip,
        Legend,
    );

    const color1 = theme.colors.col11;
    const color2 = theme.colors.col15;
    const textColor = theme.colors.col11;



// export const options = {
//     responsive: true,
//     interaction: {
//       mode: 'index' as const,
//       intersect: false,
//     },
//     stacked: false,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart - Multi Axis',
//       },
//     },
//     scales: {
//       y: {
//         type: 'linear' as const,
//         display: true,
//         position: 'left' as const,
//       },
//       y1: {
//         type: 'linear' as const,
//         display: true,
//         position: 'right' as const,
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//     },
//   };
  
//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
//   export const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//         borderColor: 'rgb(255, 99, 132)',
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         yAxisID: 'y',
//       },
//       {
//         label: 'Dataset 2',
//         data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//         borderColor: 'rgb(53, 162, 235)',
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         yAxisID: 'y1',
//       },
//     ],
//   };
  
//   export function App() {
//     return <Line options={options} data={data} />;
//   }
  

}

export default MltAxChart;