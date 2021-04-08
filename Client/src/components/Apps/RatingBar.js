import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

class RatingBar extends Component {
    

    render() {
        let ChartData={
            labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 stars'],
            datasets: [{
                lineTension: 0,
                label: 'Number of Rating',
                data: this.props.historyRatingBar,
                backgroundColor: "rgba(255, 160, 112,0.2)",
                borderColor: "rgba(255, 85, 0,1)",
                borderWidth: 1
            }]
        }
        return (
            <>

                <Bar 
                    data={ChartData}
                    options={{
                        maintainAspectRatio:false,
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        }}>
                </Bar>
            </>
        )
    }
}

export default RatingBar
