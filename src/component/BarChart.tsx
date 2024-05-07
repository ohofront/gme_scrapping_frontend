import { useEffect, useMemo, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { defaultListViewDummy } from "../dummy/LiveView";
import { Competitor, View } from "../models/view/viewModel";

interface Props {
  props: View;
}
const BarChart = ({ props }: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [list, setList] = useState<View>(defaultListViewDummy);
  const [company, setCompany] = useState<string[]>([]);
  // const [dataset, setDataset] = useState<Dataset>();

  let chartInstance: any = null;
  let ctx: any = null;

  useEffect(() => {
    setList(props);
  }, [props]);

  useEffect(() => {
    setCompany(props?.competitors.map((item) => item.company));
  }, [props]);

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
            // {
            //   type: "line",
            //   data: props.competitors.map((item: Competitor) => item.amount),
            //   backgroundColor: company?.map((item: string) =>
            //     item === "GME"
            //       ? "rgba(255, 0, 0)"
            //       : item === "hanpass"
            //       ? "rgba(54, 162, 235, 1)"
            //       : item === "gmoney"
            //       ? "rgba(255, 206, 86, 1)"
            //       : item === "Coinshot"
            //       ? "rgba(75, 192, 192, 1)"
            //       : item === "JRF"
            //       ? "rgba(123,104,238)"
            //       : item === "E9Pay"
            //       ? "rgba(255,165,0)"
            //       : item === "Moin"
            //       ? "rgba(255,105,180)"
            //       : item === "Cross"
            //       ? "rgba(165,42,42)"
            //       : ""
            //   ),
            //   borderColor: company?.map((item: string) =>
            //     item === "GME"
            //       ? "rgba(255, 0, 0)"
            //       : item === "hanpass"
            //       ? "rgba(54, 162, 235, 1)"
            //       : item === "gmoney"
            //       ? "rgba(255, 206, 86, 1)"
            //       : item === "Coinshot"
            //       ? "rgba(75, 192, 192, 1)"
            //       : item === "JRF"
            //       ? "rgba(123,104,238)"
            //       : item === "E9Pay"
            //       ? "rgba(255,165,0)"
            //       : item === "Moin"
            //       ? "rgba(255,105,180)"
            //       : item === "Cross"
            //       ? "rgba(165,42,42)"
            //       : ""
            //   ),
            //   borderWidth: 2,
            //   tension: 0,
            // },
            {
              type: "bar",
              data: props.competitors.map((item) => item.amount),
              backgroundColor: company?.map((item: string) =>
                item === "GME"
                  ? "rgba(255, 0, 0)"
                  : item === "hanpass"
                  ? "rgba(54, 162, 235, 0.7)"
                  : item === "gmoney"
                  ? "rgba(255, 206, 86, 0.7)"
                  : item === "Coinshot"
                  ? "rgba(75, 192, 192, 0.7)"
                  : item === "JRF"
                  ? "rgba(123, 104, 238, 0.7)"
                  : item === "E9Pay"
                  ? "rgba(255, 165, 0, 0.7)"
                  : item === "Moin"
                  ? "rgba(255, 105, 180, 0.7)"
                  : item === "Cross"
                  ? "rgba(165, 42, 42, 0.7)"
                  : "black"
              ),
              borderColor: company?.map((item: string) =>
                item === "GME"
                  ? "rgba(255, 0, 0)"
                  : item === "hanpass"
                  ? "rgba(54, 162, 235, 0.7)"
                  : item === "gmoney"
                  ? "rgba(255, 206, 86, 0.7)"
                  : item === "Coinshot"
                  ? "rgba(75, 192, 192, 0.7)"
                  : item === "JRF"
                  ? "rgba(123, 104, 238, 0.7)"
                  : item === "E9Pay"
                  ? "rgba(255, 165, 0, 0.7)"
                  : item === "Moin"
                  ? "rgba(255, 105, 180, 0.7)"
                  : item === "Cross"
                  ? "rgba(165, 42, 42, 0.7)"
                  : "black"
              ),
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          color: "black",
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                stepSize: getStepSize(min, max),
              },
            },
            x: {
              ticks: {
                color: "black",
                font: {
                  size: 11,
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
  }, [props, company]);

  return (
    <canvas
      ref={chartRef}
      style={{ width: "200px", height: "200px", padding: "0px" }}
    />
  );
};

export default BarChart;
