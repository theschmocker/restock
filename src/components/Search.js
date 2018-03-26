import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import SaveButton from './SaveButton';

const API_BASE = 'https://api.iextrading.com/1.0';
const SYMBOLS_ROUTE = '/ref-data/symbols';

class Search extends Component {
    constructor(props) {
        super(props);

        let stocks = [];

        const store = window.localStorage;
        if (store.getItem('symbols')) {
            stocks = JSON.parse(store.getItem('symbols'));
        }

        this.state = {
            stocks,
            query: '',
            focus: false,
        };

    }

    async componentDidMount() {
        if (this.state.stocks.length === 0) {
            const res = await fetch(API_BASE + SYMBOLS_ROUTE);
            const stocks = await res.json();
            this.setState({ stocks });

            const store = window.localStorage;
            store.setItem('symbols', JSON.stringify(stocks));
        }
    }

    changeInput = (e) => {
        this.setState({
            query: e.target.value,
        });
    }

    focus = () => {
        this.setState({ focus: true });
    }
    
    blur = () => {
        this.setState({ focus: false });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                query: '',
                focus: false,
            });
        }
    }

    render() {
        return (
            <SearchWrapper
                onFocus={this.focus}
                onBlur={this.blur}
            >
                <input 
                    type="text" 
                    value={this.state.query} 
                    ref={input => this.input = input} 
                    onChange={this.changeInput}
                />
                <SearchResults inputFocus={this.state.focus} stocks={this.state.stocks} query={this.state.query} />
            </SearchWrapper>
        );
    }
}

const SearchResults = ({ query, stocks, inputFocus }) => {
    return (
        <ResultList show={query.length > 0 && inputFocus}>
            {query && 
                searchResults(stocks, query).map(stock => (
                    <Result key={stock.iexId} stock={stock}/>
                ))
            }
        </ResultList>

    );
}

const Result = ({ stock }) => {
    return (
        <ResultWrapper>
            <Link to={`/stock/${stock.symbol}`}>{stock.symbol} - {stock.name}</Link>
            <SaveButton stock={stock} />
        </ResultWrapper>
    )
}

export default withRouter(Search);

// Styled Components

const SearchWrapper = styled.div`
    max-width: 500px;
    margin: 1rem auto;
    box-shadow: 0 0 25px black;
    input {
        width: 100%;
        height: 3rem;        
    }
`;

const ResultList = styled.ul`
    position: relative;
    max-height: ${props => props.show ? '300px' : '0px'};
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    width: 100%;
    list-style-type: none;
    text-align: left;
    background: black;

    /*transition: 0.5s max-height ease;*/
`;

const ResultWrapper = styled.li`
    padding: 0;
    margin: 0;

    &:nth-child(even) { background: #ddd; }
    &:nth-child(odd) { background: #ccc; }

    a {
        padding: 1rem;
        margin: 0;
        display: block;

        &:hover {
            background: #eee;
        }
    }

`;

//  Helper Functions

const searchResults = (stocks, query) => {
    query = query.toLowerCase();
    return stocks.filter((stock) => {
        return stock.symbol.toString().toLowerCase().startsWith(query) || stock.name.toString().toLowerCase().includes(query);
    }).slice(0, 25);
}
