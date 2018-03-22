import React, { Component } from 'react';
import styled from 'styled-components';

import Loader from './components/Loader';

const API_BASE = 'https://api.iextrading.com/1.0';

class Stockpage extends Component {
    state = {
        stock: false,
    }
    async componentDidMount() {
        const endpoint = `/stock/${this.props.match.params.symbol}/quote`;
        const res = await fetch(API_BASE + endpoint);
        const stock = await res.json();

        this.setState({
            stock,
        });

        console.log(stock);
    }

    render() {
        const { params } = this.props.match;
        return (
            <div>
                {this.state.stock 
                        ? (
                            <StockInfo stock={this.state.stock}/>
                        ) : (
                            <div>
                                <h2>{params.symbol}</h2>
                                <Loader />
                            </div>
                        )
                }
            </div>
        );
    }
}

const StockInfo = ({ stock }) => (
    <StockWrapper>
        <h1>{stock.companyName}</h1>
        <p>{stock.symbol}</p>
        <h2>{stock.latestPrice}</h2>
    </StockWrapper>
)

export default Stockpage;

// Styled Components
const StockWrapper = styled.div``;
