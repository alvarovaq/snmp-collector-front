import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { OidRecord } from "models";
import { Point } from "../models";
import { compressByInterval, calculateIntervalSeconds, filterChanges } from "../utils/graph";

export interface GraphComponentProps {
    records: OidRecord[],
    start: Date,
    end: Date,
    interval: number,
}

export const GraphComponent = (props: GraphComponentProps) => {
    const pointsError = useMemo(() => {
        return filterChanges(props.records)
            .filter(r => r.error)
            .map(r => {
                return {
                    x: r.date.getTime(),
                    y: 0,
                    marker: {
                        size: 8,
                        fillColor: '#fff',
                        strokeColor: '#FF4560',
                        radius: 2,
                        cssClass: 'apexcharts-custom-class'
                    },
                    label: {
                        borderColor: '#FF4560',
                        offsetY: 0,
                        style: {
                            color: '#fff',
                            background: '#FF4560',
                        },
                        text: r.error,
                    }
                };
            });
    }, [props.records]);

    const seriesData = useMemo(() => {
        const toPoint = (r: OidRecord): Point => ({ date: r.date, value: Number(r.value) } as Point);
        const intervalSeconds = calculateIntervalSeconds(props.start, props.end, 750);
        const MAX_GAP_MS = Math.max(props.interval, intervalSeconds) * 1000 * 2;

        const compressed = compressByInterval(props.records
            .filter(r => r.value !== undefined && !isNaN(Number(r.value)))
            .map(toPoint), intervalSeconds)

        if (compressed.length === 0) {
            return [
                [props.start.getTime(), null],
                [props.end.getTime(), null]
            ];
        }

        const result: [number, number | null][] = [];

        for (let i = 0; i < compressed.length; i++) {
            const current = compressed[i];
            result.push([current.date.getTime(), current.value]);

            const next = compressed[i + 1];
            if (next) {
                const gap = next.date.getTime() - current.date.getTime();

                if (gap > MAX_GAP_MS) {
                    result.push([
                        current.date.getTime() + 1,
                        null
                    ]);
                }
            }
        }
        
        if (result[0][0] > props.start.getTime()) {
            result.unshift([props.start.getTime(), null]);
        }
        
        const last = result[result.length - 1][0];
        if (last < props.end.getTime()) {
            result.push([props.end.getTime(), null]);
        }

        return result;
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
        },
        annotations: {
            points: pointsError
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
