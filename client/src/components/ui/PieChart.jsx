import Chart from "react-apexcharts"
import useScreenSize from "../../hooks/useScreenSize"

export default function PieChart({ series, labels, colors, title }) {
    const { width } = useScreenSize();

    const plotOptions = {
        pie: {
            donut: {
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
            width="95%"
            series={series}
            options={{
                chart: {
                    fontFamily: "inherit",
                },
                dataLabels: {
                    enabled: width <= 560 ? false : true,
                },
                labels,
                colors,
                plotOptions,
                stroke: {
                    width: 0,
                },
                legend: {
                    width: width <= 560 ? "100%" : 150,
                    position: width <= 560 ? "bottom" : "bottom",
                    horizontalAlign: width <= 560 ? "left" : "",
                    offsetX: width <= 560 ? "100%" : 280,
                    markers: {
                        offsetY: 0,
                    },
                    formatter: (seriesName, opts) => {
                        return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]];
                    },
                },
            }}
        />
    );
}