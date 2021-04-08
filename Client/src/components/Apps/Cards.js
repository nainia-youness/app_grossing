import React, { Component } from 'react'
import OneCard from './OneCard'
import {Col} from "react-bootstrap";


class Cards extends Component {
    constructor(props) {
        super(props)
        const {cards}=this.props
        this.state = {
            downloads:cards.downloads,
            lastMonthDownloads:cards.lastMonthDownloads,
            rating:cards.rating,
            numberRating:cards.numberRating,
            rank:cards.rank,
            freePaid:cards.freePaid,
            androidVersion:cards.androidVersion,
            libraries:cards.libraries,
            lastUpdate:cards.lastUpdate,
            appAge:cards.appAge,
            appSize:cards.appSize,
            contentRating:cards.contentRating
        }
    }
    
    render() {
        let {cards}=this.props
        return (
            <>
                    <Col md={4} sm={4} xs={6}>
                        <OneCard name='Downloads' value={cards.downloads}></OneCard>
                    </Col>
                    <Col md={4} sm={4} xs={6}>
                        <OneCard name='Rating' value={parseFloat(cards.rating).toFixed(2)} plusValue={cards.numberRating}></OneCard>
                    </Col>
                    <Col md={4} sm={4} xs={6}>
                        <OneCard name='Rank' value={cards.rank}></OneCard>
                    </Col>
            </>
        )
    }
}

export default Cards
