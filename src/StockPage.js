import React, { Component } from 'react';
import styled from 'styled-components';

import Loader from './components/Loader';

const API_BASE = 'https://api.iextrading.com/1.0';

class Stockpage extends Component {
    state = {
        stock: false,
    }
    async getStock(symbol) {
        this.setState({ stock: false });
        const endpoint = `/stock/${symbol}/quote`;
        const res = await fetch(API_BASE + endpoint);
        const stock = await res.json();

        return stock;
    }

    async componentDidMount() {
        const stock = await this.getStock(this.props.match.params.symbol);

        this.setState({ stock });
    }

    async componentWillReceiveProps(nextProps) {
        console.log();
        console.log();
        if (this.props.match.params.symbol !== nextProps.match.params.symbol) {
            const stock = await this.getStock(nextProps.match.params.symbol);

            this.setState({ stock });

        }
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
