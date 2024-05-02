import Chart from "react-apexcharts";
import useScreenSize from "../../hooks/useScreenSize";

export default function PieChart({ series, labels, colors }) {
  const { width } = useScreenSize();

  const plotOptions = {
    pie: {
      donut: {
        size: "50%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total tasks",
            fontSize: 14,
            fontWeight: 700,
            color: "black",
          },
        },
      },
    },
  };
  return (
    <Chart
      type="donut"
      height={400}
      width="100%"
      series={series}
      options={{
        chart: {
          fontFamily: "inherit",
        },
        // dataLabels: {
        //   enabled: width <= 560 ? false : true,
        // },
        labels,
        colors,
        plotOptions,
        stroke: {
          width: 0,
        },
        legend: {
          width: 150,
          position:"bottom",
          horizontalAlign: width <= 560 ? "left" : "",
          offsetX: 70,
          markers: {
            offsetY: 0,
          },
          formatter: (seriesName, opts) => {
            return [
              seriesName,
              " - ",
              opts.w.globals.series[opts.seriesIndex],
            ];
          },
        },
      }}
    />
  );
}
