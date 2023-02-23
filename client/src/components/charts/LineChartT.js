import { ChartStyle } from '../../styled/globalStyles';
import { theme } from '../../themes/theme';
import { useUserContext } from '../../providers/userContext';
import { getStrFromTs } from '../../utils/Date';

import React from 'react';
import { useState, useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';


/***********************************************************
 * Chart.js component 
 * Chart type: Line Chart

 * @returns Line chart
 ***********************************************************/

const LineChartT = ({ xValues, yValues, name, unit, titel, showTherapie }) => {

  
  const { timeCatArrays, setTimeArrays, LOCAL_STORAGE_EVENTS } = useUserContext();


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    annotationPlugin,
    Title,
    Tooltip,
    Legend
  );

  //................................................

  const textColor = theme.colors.col3;

  const bgcolor1 = "rgb(110, 253, 110, 0.3)";
  const bgcolor2 = "rgb(247, 250, 87, 0.3)";
  const bgcolor3 = "rgb(243, 191, 78, 0.3)";
  const bgcolor4 = 'rgb(247, 89, 89, 0.3)';

  const lastDay = xValues[xValues.length - 1];
  const firstDay = xValues[0];

  const colorArray = [bgcolor1, bgcolor2, bgcolor3, bgcolor4];
  const yMinArray = [36, 37.5, 38, 39];
  const yMaxArray = [37.5, 38, 39, 40];


  const [myAnnotations, setMyAnnotations] = useState([]);
  const initState = [];
  const [done, setDone] = useState();

/************************************************
 * some functions to crate annotations
 */

  const setYline = (yValue) => {
    setMyAnnotations([
      ...myAnnotations, myAnnotations.push({
        type: 'line',
        yMin: yValue,
        yMax: yValue,
        borderColor: 'rgb(206, 23, 93)',
        borderWidth: 3,
        label: {
          display: true,
          content: 'hohes Fieber',
          position: 'end',
          yAdjust: -15,
          padding: 5,
          backgroundColor: 'rgb(206, 23, 93)',
          color: '#fff'
        }
      })
    ])
  }

  const setColorBoxes = (colorArray, xMin, xMax, yMinArray, yMaxArray) => {

    colorArray.map((e, i) => {
      setMyAnnotations([
        ...myAnnotations, myAnnotations.push({
          type: 'box',
          xMin: xValues.findIndex(e => xMin === e),
          xMax: xValues.findIndex(e => xMax === e),
          yMin: yMinArray[i],
          yMax: yMaxArray[i],
          backgroundColor: e,
          drawTime: 'beforeDatasetsDraw',
        })
      ])
    })
  }

  useEffect(() => {
    let eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
    if (!timeCatArrays) {
      setTimeArrays(eventsArray)
    }
    setDone(true)
  }, [])

  console.log("Therapietermine", timeCatArrays.therapie)
  if (timeCatArrays.therapie.length > 0) {
    console.log(timeCatArrays.therapie[2]);
    const tt = getStrFromTs(timeCatArrays.therapie[2])
    console.log(tt)
    const ind = xValues.findIndex(e => getStrFromTs(timeCatArrays.therapie[2]) === e)
    console.log("index Gefunden!", ind)
  }

  
  useEffect(() => {
    setColorBoxes(colorArray, firstDay, lastDay, yMinArray, yMaxArray);
    setYline(39);

    if (showTherapie === true) {
      if (timeCatArrays.therapie.length > 0) {
        console.log("es gibt therapietermine zum Plotten")
        timeCatArrays.therapie.map((e, i) => {
          console.log("firstDay:", firstDay, "lastDay:", lastDay, "und..???", e)
          if ((firstDay < timeCatArrays.therapie[i]) && (timeCatArrays.therapie[i] < lastDay)) {
            console.log("myAnnotations mit TherapieLines")
            setMyAnnotations([...myAnnotations, myAnnotations.push({
              id: 'line_' + timeCatArrays.therapie[i],
              type: 'line',
              label: {
                display: true,
                content: 'Therapie',
                position: 'end',
                yAdjust: -5,
                xAdjust: -5,
                padding: 5,
                backgroundColor: theme.colors.col3,
                color: '#fff'
              },
              xMin: getStrFromTs(e),
              xMax: getStrFromTs(e),
              backgroundColor: 'red',
              borderWidth: 2
            })
            ])
          }
        })
      }
    }
    checkAnnotations();
  }, [showTherapie, done])


  const checkAnnotations = () => {
    // wenn annotataions existieren, lasse nur die zu, die dem Type Object entsprechen.
    // Grund: aus mir unbekanntem Grund werden annotations generiert, die nur aus einer 
    // Zahl bestehen. Diese führen zu unerwünschten Effekten im Chart, also werden sie ausgeschlossen.
    if (myAnnotations.length > 0)
      setMyAnnotations(myAnnotations.filter(e => (typeof (e) === 'object')))
  }


  useEffect(() => {
    setMyAnnotations(initState)
    console.log("myAnnotations", myAnnotations)
  }, [showTherapie])


	/******************
	 * Chart options
	 ******************/

  const options = {
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
      annotation:
      {
        annotations:
          myAnnotations,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Datum',
          font: { size: 18 },
          color: textColor,
          padding: {
            top: 10,
            bottom: 10
          }
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
        suggestedMin: 60,
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
      }
    },
    layout: {
      padding: 10
    }
  };


	/******************
 * Chart data
 ******************/

  const data = {
    labels: xValues,
    datasets: [
      {
        label: 'Körpertemperatur',
        data: yValues,
        borderColor: theme.colors.col5,
        backgroundColor: theme.colors.col5,
        tension: 0,
        borderWidth: 1,
        spanGaps: true,
        connect: false,
        fill: false,
        pointStyle: 'circle',
        pointBorderColor: '#000',
        radius: 5
      },
    ],
  };

	//************************************************** */

  return (
    <ChartStyle >
      <Line
        options={options}
        data={data}
        redraw={true} />
    </ChartStyle>
  )
};


export default LineChartT;
