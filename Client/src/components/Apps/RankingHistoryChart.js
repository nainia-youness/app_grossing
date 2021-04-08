import React, { Component } from 'react'
import ReactApexChart from "react-apexcharts";


class RankingHistoryChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
             
          
          
          
series: [{
  name: this.props.RankingHistoryChartData.name1,
  data: this.props.RankingHistoryChartData.data1
},
{
  name: this.props.RankingHistoryChartData.name2,
  data: this.props.RankingHistoryChartData.data2
},
{
  name: this.props.RankingHistoryChartData.name3,
  data: this.props.RankingHistoryChartData.data3
},
{
  name: this.props.RankingHistoryChartData.name4,
  data: this.props.RankingHistoryChartData.data4
}
],

options: {
colors: ['rgb(254, 176, 25)','rgb(0, 143, 251)', 'rgb(0, 227, 150)', 'rgb(255, 69, 96)'],
chart: {
  height: 350,
  type: 'line',
  zoom: {
    enabled: false
  },
},
stroke: {
    show: true,
    curve: 'straight',
    lineCap: 'butt',
    //colors: undefined,
    width: 2,
    dashArray: 0,      
},
dataLabels: {
  enabled: false
},

title: {
  text: 'Ranking History in Turkey',
  align: 'left',
  style: {
    fontSize:'13px',
    color:'grey',
    fontWeight:  'none',
  },
},

legend: {
  tooltipHoverFormatter: function(val, opts) {
    return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
  }
},
markers: {
  size: 0,
  hover: {
    sizeOffset: 6
  }
},
xaxis: {
  categories: this.props.RankingHistoryChartData.categories,
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
tooltip: {
  style: {
    fontSize: '10px',
    fontFamily: undefined,
  },
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
          <>
            <ReactApexChart  options={this.state.options} series={this.state.series} type="line" height={550} />
          </>
        );
      }
    }

export default RankingHistoryChart
