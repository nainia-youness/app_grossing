
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
class DailyInstalls extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
          name: "Installs",
          data: this.props.dailyInstallsData.data
        }
      ],
      options: {
        chart: {
          width:500,
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },





        xaxis: {
          categories: this.props.dailyInstallsData.categories,
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
                  return val 
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
      },
    
    
    };
  }



  render() {
    return (
<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={200} />
</div>
    );
  }
}

export default DailyInstalls