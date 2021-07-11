import { useRef, useEffect, useState } from "react";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables);

const COLOR_NUMBER = 15;
const randomColorPicker = () => {
  const randomNumber = Math.floor(Math.random() * COLOR_NUMBER);

  return randomNumber;
}

console.log(randomColorPicker());

const BarChart = ({ labels, data, subLabel, title  }) => {
  const chartRef = useRef(null);
  const [myChart, setMyChart] = useState(null);
  useEffect(() => {
    if (!chartRef) return;
    const ctx = chartRef.current.getContext("2d");
    var delayed;
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Dia 1", "Dia 2", "Dia 3", "Dia 4", "Dia 5", "Dia 6"],
        datasets: [
          {
            label: subLabel,
            data: [10,20,1 , 20, 30, 5],
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
      // options: {
      //   legend: {
      //       labels: {
      //         color: "#000",
      //         fontSize: 18,
      //       },
      //       title: {
      //         color: '#000'
      //       },
      //     },plugins:{
      //       legend: {
      //         display: true,
      //         labels: {
      //             color: 'rgb(28,236,229)'
      //         }
      //     }
      //     },
      //     cutoutPercentage: 70,
      // }
      options: {
        responsive: true,
        color: '#fff',
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    color: 'rgb(28,236,229)'
                }
            },
            title: {
                display: true,
                position: 'top',
                text: title,
                color: "rgb(28,236,229)",
                font: {
                    size: 15
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 150 + context.datasetIndex * 50;
            }
            return delay;
          },
        }
    }
    });
    setMyChart(myChart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef]);

  useEffect(() => {
    
    if (!myChart) return;
    myChart.data.datasets[0].data = data;
    myChart.data.labels = labels;
    myChart.update();
  }, [data, labels ,myChart]);

  return <canvas ref={chartRef} id="myChart" width="200" height="200" />;
};

export default BarChart;


// new Chart(ctx, {
//                         type: 'pie',
//                         data: {
//                             labels: json.formasPago,
//                             datasets: [{
//                                 data: json.cantidades,
//                                 backgroundColor: json.coloresFormasPago,
//                                 hoverOffset: 4
//                             }]
//                         },
//                         options: {
//                             responsive: true,
//                             plugins: {
//                                 legend: {
//                                     position: 'bottom',
//                                     align: 'center',
//                                     labels: {
//                                         color: 'rgb(0,0,0)'
//                                     }
//                                 },
//                                 title: {
//                                     display: true,
//                                     position: 'top',
//                                     text: 'Usos por forma de pago',
//                                     color: "#000000",
//                                     font: {
//                                         size: 20
//                                     },
//                                     padding: {
//                                         top: 10,
//                                         bottom: 30
//                                     }
//                                 }
//                             }
//                         }
//                     });
