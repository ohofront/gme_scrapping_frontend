import { useEffect, useRef, useState } from "react";
import { View } from "../models/view/viewModel"
import { Chart, registerables } from "chart.js";
import { Dataset } from "../models/chart/chartModel";

interface Props {
    props: View[];
}

const LineChart = ({props}: Props) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [list, setList] = useState<View[]>([]);
    const [dataset, setDataset] = useState<Dataset[]>([]);

    let chartInstance: any = null;
    let ctx : any = null;

    useEffect(() => {
        setList(props)  
    },[list])

    useEffect(() => {
        let tempList: Dataset[] = [];
        tempList = list.map(item => {
          return {
            label: item.country,
            data: item.competitors.map(sub => sub.amount),
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
            borderWidth: 2,
          }
        })  
        setDataset(tempList);
    },[list]);

    useEffect(() => {
        if(chartRef.current != null) {
            ctx = chartRef.current.getContext("2d");
        }

        const labels = props[0].competitors.map(item => item.company);

        const createChart = () => {
            Chart.register(...registerables);
            chartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: dataset
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 200000000,
                        }
                    }
                }
            })
        }

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
    },[dataset])
    
    
    return<canvas ref={chartRef}/>;
};
export default LineChart;