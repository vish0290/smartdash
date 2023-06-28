import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

function Chart() {
    // state to store data
    const [dataFromApi, setDataFromApi] = useState([]);
    useEffect(() => {
        axios
            .get("/process")
            .then((response) => {
                // console.log(response.data);
                setDataFromApi(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    // options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Chart.js Bar Chart",
            },
        },
    };

    const generatedData = [];
    const pieGeneratedData = [];

    dataFromApi?.map((singleData) => {
        const singleDatakaArray = Object.values(singleData);
        singleDatakaArray.map((arr) => {
            // labels
            const labels1 = arr[1]?.category;
            const units1 = arr[1].units;

            // console.log("heyllo", arr[0] === "pi");
            if (arr[0] === "pi") {
                console.log("inside if");
                const data = {
                    labels: labels1,
                    datasets: [
                        {
                            label: "# of Votes",
                            data: units1,
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
                            borderWidth: 1,
                        },
                    ],
                };
                pieGeneratedData.push(data);
            } else {
                const data = {
                    labels: labels1,
                    datasets: [
                        {
                            label: "Dataset 1",
                            data: units1?.map((element) => element),
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                    ],
                };
                generatedData.push(data);
            }
        });
    });

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
                {generatedData.map((data) => {
                    return (
                        <div className="w-[500px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)]  hover:scale-110 transition-all duration-300 cursor-pointer">
                            <Bar
                                data={data}
                                options={options}
                            />
                        </div>
                    );
                })}
                {pieGeneratedData.map((pieData) => {
                    return (
                        <div className="w-[500px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)] hover:scale-110 transition-all duration-300 cursor-pointer">
                            <Pie
                                data={pieData}
                                options={options}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chart;
