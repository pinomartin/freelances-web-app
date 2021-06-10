import { useRef, useEffect, useState } from "react";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables);

const COLOR_NUMBER = 15;
const randomColorPicker = () => {
  const randomNumber = Math.floor(Math.random() * COLOR_NUMBER);

  return randomNumber;
}



console.log(randomColorPicker());;

const DoughtChart = ({ labels, data  }) => {
  const chartRef = useRef(null);
  const [myChart, setMyChart] = useState(null);
  useEffect(() => {
    if (!chartRef) return;
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Proyecto 1", "Proyecto 2", "Proyecto 3", "Proyecto 4", "Proyecto 5", "Proyecto 6"],
        datasets: [
          {
            label: "Hs",
            data: [10,20],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
            labels: {
              color: "#000",
              fontSize: 18,
            },
            title: {
              color: '#000'
            },
          },plugins:{
            legend: {
              display: true,
              labels: {
                  color: 'rgb(28,236,229)'
              }
          }
          },
          cutoutPercentage: 70,
      }
    });
    setMyChart(myChart);
  }, [chartRef]);

  useEffect(() => {
    if (!myChart) return;
    myChart.data.datasets[0].data = data;
    myChart.data.labels = labels;
    myChart.update();
  }, [data, labels ,myChart]);

  return <canvas ref={chartRef} id="myChart" width="200" height="200" />;
};

export default DoughtChart;
