import React from 'react';

const API_BASE = 'https://api.iextrading.com/1.0';

function withStockInfo(Component) {
    return class extends React.Component {
        state = {
            stock: {},
        }

        async getQuote(symbol) {
            const endpoint = `/stock/${symbol}/quote`;
            const res = await fetch(API_BASE + endpoint);
            const stock = await res.json();

            return stock;
        }

        async componentDidMount() {
            // Update stock info every 2 seconds
            this.updateStock = setInterval(async () => {
                let stock = await this.getQuote(this.props.stock.symbol);
                this.setState({ stock });
            }, 2000); 

        }

        componentWillUnmount() {
            clearInterval(this.updateStock);
        }

        render() {
            return (
                <Component { ...this.props } stock={this.state.stock} />
            );
        }

    }
}

export default withStockInfo;
