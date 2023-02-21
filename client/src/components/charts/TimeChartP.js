import { theme } from '../../themes/theme';
import { ChartStyle } from '../../styled/globalStyles';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';

//----------------------------------------------------------------------

const TimeChartP = ({ xValues, yValues, titel, name, unit }) => {

  // console.log("x-", xValues)
  // console.log("y", yValues)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    TimeSeriesScale,
    LinearScale,
    annotationPlugin,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  //................................................

  const textColor = theme.colors.col3;
  //...................

  const myData = xValues.map((e, i) => {
    return ({ x: e, y: yValues[i] })
  })

  const yMin = Math.round(Math.min(...yValues)) - 6;
  const yMax = Math.round(Math.max(...yValues)) + 6;


  let data;

  data = {
    // labels, //nur bei type: Line
    datasets: [
      {
        // label: 'Körpergewicht',
        data: myData,
        fill: false,
        borderColor: theme.colors.col3,
        backgroundColor: theme.colors.col2,
        tension: 0,
        borderWidth: 1,
        spanGaps: true,
        connect: false,
        pointStyle: 'rect',
        pointBorderColor: '#000',
        radius: 5,
        stepped: false,
      }
    ],
  }

  //...................

  let options;
  options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: titel,
        font: { size: 22 },
        color: textColor
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'DD',
        },
        title: {
          display: true,
          text: 'Datum',
          font: { size: 18 },
          color: textColor,
          padding: 10
        },
        ticks: {
          font: { size: 15 },
          maxRotation: 90,
        },
        grid: {
          tickColor: 'grey'
        }
      },
      y: {
        suggestedMin: yMin,
        suggestedMax: yMax,
        title: {
          display: true,
          text: name + ' [' + unit + ']',
          font: { size: 18 },
          color: textColor,
          padding: 10
        },
        ticks: {
          font: { size: 16 },
        },
      },
    }
    // }
  };

  //-------------------------------------------------------------
  return (
    <ChartStyle >
      <Line
        options={options}
        data={data}
        redraw={true} />
    </ChartStyle>
  )
};


export default TimeChartP;
