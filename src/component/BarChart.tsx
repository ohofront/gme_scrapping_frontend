import { useEffect, useMemo, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { defaultListViewDummy } from "../dummy/LiveView";
import { View } from "../models/view/viewModel";

interface Props {
  props: View;
}
const BarChart = ({ props }: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [list, setList] = useState<View>(defaultListViewDummy);
  // const [dataset, setDataset] = useState<Dataset>();

  let chartInstance: any = null;
  let ctx: any = null;

  useEffect(() => {
    setList(props);
  }, [list, props]);

  // 최대,최소값을 구하는
  const min = useMemo(() => {
    return Math.min.apply(
      null,
      props.competitors.map((item) => item.amount)
    );
  }, [props]);

  const max = useMemo(() => {
    return Math.max.apply(
      null,
      props.competitors.map((item) => item.amount)
    );
  }, [props]);

  const getStepSize = (min: number, max: number) => {
    const range = max - min; // 최댓값과 최솟값 간의 범위를 계산
    const interval = Math.ceil(range / 3); // 범위를 3등분하여 각 구간의 크기를 계산
    const exponent = Math.floor(Math.log10(interval)); // 각 구간의 크기에 대한 로그 값을 계산
    const factor = Math.pow(10, exponent); // 10의 거듭제곱을 통해 가장 가까운 10의 배수로 구간 크기를 정규화
    return Math.ceil(interval / factor) * factor;
  };

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
    if (chartRef.current != null) {
      ctx = chartRef.current.getContext("2d");
    }

    const createChart = () => {
      Chart.register(...registerables);
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: props.competitors.map((item) => item.company),
          datasets: [
            {
              // label: props.country,
              // label: "GME",
              data: props.competitors.map((item) => item.amount),
              backgroundColor: [
                "rgba(255, 0, 0)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 135, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              ticks: {
                stepSize: getStepSize(min, max),
              },
            },
            x: {
              ticks: {
                color: "black",
                font: {
                  size: 17,
                  weight: "bold",
                },
              },
            },
          },
          plugins: {
            colors: { enabled: true },
            legend: {
              position: "top",
              display: false,
              labels: {
                color: "black",
                font: {
                  size: 10,
                },
              },
            },
            title: {
              font: {
                size: 30,
              },
              display: true,
              text: props.country,
              position: "top",
              color: "1px solid #ddd",
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
  }, [props]);

  return (
    <canvas
      ref={chartRef}
      style={{ width: "300px", height: "300px", padding: "20px 20px" }}
    />
  );
};

export default BarChart;
