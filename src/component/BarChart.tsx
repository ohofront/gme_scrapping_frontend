import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { defaultListViewDummy } from "../dummy/LiveView";
import { View } from "../models/view/viewModel";

interface Props {
  props: View;
}
const BarChart = ({props}: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [list, setList] = useState<View>(defaultListViewDummy);
  // const [dataset, setDataset] = useState<Dataset>();

  let chartInstance: any = null;
  let ctx : any = null;

  useEffect(() => {
    setList(props)  
  },[list])

  // useEffect(() => {
  //   setDataset({
  //     label: list.country,
  //     data: list.competitors.map(item => item.amount),
  //     backgroundColor: [
  //       "rgba(255, 99, 132, 0.2)",
  //       "rgba(54, 162, 235, 0.2)",
  //       "rgba(255, 206, 86, 0.2)",
  //       "rgba(75, 192, 192, 0.2)",
  //       "rgba(153, 102, 255, 0.2)",
  //       "rgba(255, 159, 64, 0.2)",
  //     ], 
  //     borderColor: [
  //       "rgba(255, 99, 132, 1)",
  //       "rgba(54, 162, 235, 1)",
  //       "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 1)",
  //       "rgba(153, 102, 255, 1)",
  //       "rgba(255, 159, 64, 1)",
  //     ],
  //     borderWidth: 10,
  //   });
  // },[list]);
  
  useEffect(() => {
    if(chartRef.current != null) {
      ctx = chartRef.current.getContext("2d");
    }

    const createChart = () => {
      Chart.register(...registerables);
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: props.competitors.map(item => item.company),
          datasets: [
            {
              label: props.country,
              data: props.competitors.map(item => item.amount),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 3,

            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 180000000,
            },
          },
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    destroyChart(); // 기존 차트 파괴
    createChart(); // 새로운 차트 생성

    return () => {
      destroyChart(); // 컴포넌트가 unmount될 때 차트 파괴
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;