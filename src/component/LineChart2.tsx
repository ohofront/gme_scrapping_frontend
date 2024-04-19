import { useEffect, useMemo, useRef, useState } from "react";
import { HistoricalViewModel, View } from "../models/view/viewModel";
import { Chart, registerables } from "chart.js";
import { Dataset } from "../models/chart/chartModel";
import {
  defaultHistoricalViewArrayDummy,
  defaultHistoricalViewDummy,
} from "../dummy/HistoricalView";

interface Props {
  props: HistoricalViewModel[];
}

const LineChart2 = ({ props }: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [list, setList] = useState<HistoricalViewModel[]>([]);
  const [model, setModel] = useState<HistoricalViewModel>(
    defaultHistoricalViewDummy
  );
  const [dataset, setDataset] = useState<Dataset[]>([]);

  let chartInstance: any = null;
  let ctx: any = null;

  useEffect(() => {
    setList(props);
  }, [props]);

  useEffect(() => {
    props.map((item) => setModel(item));
  }, [props]);
  // 최대,최소값을 구하는
  const min = useMemo(() => {
    return Math.min.apply(
      null,
      model.competitors.map((item) => item.amount)
    );
  }, [model]);

  const max = useMemo(() => {
    return Math.max.apply(
      null,
      model.competitors.map((item) => item.amount)
    );
  }, [model]);

  const getStepSize = (min: number, max: number) => {
    const range = max - min; // 최댓값과 최솟값 간의 범위를 계산
    const interval = Math.ceil(range / 50); // 범위를 50등분하여 각 구간의 크기를 계산
    const exponent = Math.floor(Math.log10(interval)); // 각 구간의 크기에 대한 로그 값을 계산
    const factor = Math.pow(10, exponent); // 10의 거듭제곱을 통해 가장 가까운 10의 배수로 구간 크기를 정규화
    return Math.ceil(interval / factor) * factor;
  };

  useEffect(() => {
    let tempList: Dataset[] = [];
    tempList = list.map((item) => {
      return {
        label: item.company,
        data: item.competitors.map((sub) => sub.amount),
        backgroundColor: [
          "rgba(255, 0, 0)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      };
    });
    setDataset(tempList);
  }, [list]);

  useEffect(() => {
    if (chartRef.current != null) {
      ctx = chartRef.current.getContext("2d");
    }

    const labels = props[0]?.competitors.map((item) => item.date);

    const createChart = () => {
      Chart.register(...registerables);
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: dataset,
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                stepSize: getStepSize(min, max),
                display: true,
              },
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

    destroyChart();
    createChart();

    return () => {
      destroyChart(); //컴포넌트가 unmount 될때 차트 파괴
    };
  }, [dataset]);

  return <canvas ref={chartRef} height={2000} width={1000} />;
};
export default LineChart2;
