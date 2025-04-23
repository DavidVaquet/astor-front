import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
  import { IoBarChartSharp } from "react-icons/io5";
  import React from "react";

   
  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Ingresos",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#eae717"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#bcbcbc",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
   
  export default function CardCharts() {
    return (    

       
        <div className="flex">
            
      <Card className="w-full bg-secondary-100">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col bg-secondary-100 gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <IoBarChartSharp className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="white">
              Linea del tiempo
            </Typography>
            <Typography
              variant="small"
              color="white"
              className="max-w-sm font-normal"
            >
              Visualice sus datos de una manera sencilla utilizando la linea del tiempo.
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0 bg-secondary-100">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
        </div>
        
    );
  }