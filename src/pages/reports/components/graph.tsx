import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { OidRecord } from "models";
import { Point } from "../models";
import { compressByInterval, calculateIntervalSeconds } from "../utils/graph";

export interface GraphComponentProps {
    records: OidRecord[],
    start: Date,
    end: Date,
}

export const GraphComponent = (props: GraphComponentProps) => {
    const seriesData = useMemo(() => {
        const toPoint = (r: OidRecord): Point => ({ date: r.date, value: Number(r.value) } as Point)

        const filtered = compressByInterval(props.records
            .filter(r => r.value !== undefined && !isNaN(Number(r.value)))
            .map(toPoint), calculateIntervalSeconds(props.start, props.end, 750))
            .map(r => [r.date.getTime(), r.value] as [number, number | null]);

        if (filtered.length === 0) {    
            return [
                [props.start.getTime(), null],
                [props.end.getTime(), null]
            ];
        }
        
        if (filtered[0][0] > props.start.getTime()) {
            filtered.unshift([props.start.getTime(), null]);
        }
        
        const lastIndex = filtered.length - 1;
        const lastDataTime = filtered[lastIndex][0];
        const lastDataValue = filtered[lastIndex][1];
        const now = Date.now();
        const endTime = props.end.getTime();
        
        if (lastDataTime < now && now < endTime) {
            filtered.push([now, lastDataValue]);
            filtered.push([endTime, null]);
            return filtered;
        } else if (lastDataTime < endTime && now >= endTime) {
            filtered.push([endTime, lastDataValue]);
            return filtered;
        }

        return filtered;
    }, [props.records, props.start, props.end]);

    const formatXAxis = (value: string): string | string[] => {
        const d = new Date(value);
        const isMidnight = 
            d.getHours() === 0 &&
            d.getMinutes() === 0 &&
            d.getSeconds() === 0;
            
        if (isMidnight) {
            return d.toLocaleDateString();
        }
        
        return d.toLocaleTimeString();
    };

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
            curve: "straight",
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
            },
            labels: {
                formatter: formatXAxis
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
                formatter: (value: number) => {
                    const date = new Date(value);
                    return date.toLocaleString();
                }
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
            height="100%"
        />
    );
};
