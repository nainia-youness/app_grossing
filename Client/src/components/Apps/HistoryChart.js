import React, { Component } from 'react'
import ReactApexChart from "react-apexcharts";

class HistoryChart extends Component {


      render() {
        let series= [{
          name: "Rating Count",
          data: this.props.historyRatingData.data
        }
        ]
        let     options= {
          chart: {
            height: 150,
            type: 'line',
            zoom: {
              enabled: false
            },
            width: 200,
          },
          dataLabels: {
            enabled: false
          },
    
    
    
    
    
          xaxis: {
                  categories: this.props.historyRatingData.categories,
                  floating: true,
                  axisTicks: {
                    show: false
                  },
                  axisBorder: {
                    show: false
                  },
                  labels: {
                    show: false
                  },
          },
          fill: {
            colors: ['rgb(255, 160, 112)']
          },
          stroke: {
            show: true,
            curve: 'straight',
            lineCap: 'butt',
            colors: undefined,
            width: 2,
            dashArray: 0,      
        },
          colors:['rgb(255, 85, 0)'],
          tooltip: {
            y: [
              {
                title: {
                  formatter: function (val) {
                    return val
                  }
                }
              },
              {
                title: {
                  formatter: function (val) {
                    return val + " per session"
                  }
                }
              },
              {
                title: {
                  formatter: function (val) {
                    return val;
                  }
                }
              }
            ]
          },
          grid: {
            borderColor: '#f1f1f1',
          }
        }
        return (
    <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
        );
      }

}

export default HistoryChart