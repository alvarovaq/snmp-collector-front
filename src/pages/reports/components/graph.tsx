import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { OidRecord } from "models";

export interface GraphComponentProps {
    records: OidRecord[],
}

export const GraphComponent = (props: GraphComponentProps) => {
    const seriesData = useMemo(() => {
        return props.records
        .filter(r => r.value !== undefined && !isNaN(Number(r.value)))
        .map(r => [
            new Date(r.date).getTime(),
            Number(r.value)
        ])
    }, [props.records]);

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "area",
            height: 300,
            foreColor: "#999",
            stacked: true,
            zoom: {
                enabled: true,
                type: "x",
                autoScaleYaxis: true
            },
            toolbar: {
                show: false,
                tools: {
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            },
            dropShadow: {
                enabled: true,
                enabledOnSeries: [0],
                top: -2,
                left: 2,
                blur: 5,
                opacity: 0.06
            }
        },
        colors: ["#00E396"],
        stroke: {
            curve: "smooth",
            width: 3
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            strokeColors: "#fff",
            strokeWidth: 3,
            strokeOpacity: 1,
            fillOpacity: 1,
            hover: {
                size: 6
            }
        },
        xaxis: {
            type: "datetime",
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                offsetX: 14,
                offsetY: -5
            },
            tooltip: {
                enabled: true
            }
        },
        grid: {
            padding: {
                left: -5,
                right: 5
            }
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy HH:mm:ss"
            },
            theme: "dark",
        },
        legend: {
            position: "top",
            horizontalAlign: "left"
        },
        fill: {
            type: "solid",
            opacity: 0.7
        }
    };

    const series = [
        {
            name: "Valor",
            data: seriesData
        }
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="area"
            height={300}
        />
    );
};
