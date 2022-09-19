$(document).ready(function() {
    setTimeout(function() {
        var dom = document.getElementById("chart-Bar-besic-column");
        var myChart = echarts.init(dom);
        var app = {};
        var option = {
            title: {
                text: 'Consumo de Diesel',
                subtext: 'Consumo de Diesel Mensal'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['2019', '2020']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            color: ["rgba(163, 137, 212, 1)", "rgba(28, 233, 181, 1)"],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value} L'
                }
            }],
            series: [{
                name: '2019',
                type: 'line',
                smooth: true,
                data: [165231, 180000, 170792, 175087, 183378, 160944, 139400, 163600, 173600, 195600, 186400, 150000],
                markPoint: {
                    data: [{
                        type: 'max',
                        name: 'Maximum'
                    }, {
                        type: 'min',
                        name: 'Minimum'
                    }]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        name: '100'
                    }]
                }
            }, {
                name: '2020',
                type: 'line',
                smooth: true,
                data: [110000, 138000, 100000],
                markPoint: {
                    data: [{
                        name: 'Week Minimum',
                        value: -2,
                        xAxis: 1,
                        yAxis: -1.5
                    }]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        name: '100'
                    }]
                }
            }]
        };
        myChart.setOption(option, true);

        var dom1 = document.getElementById("chart-Bar-besic-column1");
        var myChart1 = echarts.init(dom1);
        var app1 = {};
        var option1 = {
            title: {
                text: 'Km Rodado',
                subtext: 'Km Rodado Mensalmente'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['2019', '2020']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            color: ["rgba(253, 160, 133, 1)", "rgba(111, 134, 214, 1)"],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value} L'
                }
            }],
            series: [{
                name: '2019',
                type: 'line',
                smooth: true,
                data: [495693, 547212, 575444, 582783, 575546, 541913, 442700, 511700, 468600, 513500, 557800, 459200],
                markPoint: {
                    data: [{
                        type: 'max',
                        name: 'Maximum'
                    }, {
                        type: 'min',
                        name: 'Minimum'
                    }]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        name: '100'
                    }]
                }
            }, {
                name: '2020',
                type: 'line',
                smooth: true,
                data: [400000, 457000, 437000],
                markPoint: {
                    data: [{
                        name: 'Week Minimum',
                        value: -2,
                        xAxis: 1,
                        yAxis: -1.5
                    }]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        name: '100'
                    }]
                }
            }]
        };
        myChart1.setOption(option1, true);
    }, 700);
});
