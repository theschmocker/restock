import React, { Component } from 'react';
import styled from 'styled-components';

class Search extends Component {
    state = {
        query: '',
    }

    changeInput = (e) => {
        this.setState({
            query: e.target.value,
        });
    }

    render() {
        return (
            <SearchWrapper>
                <input 
                    type="text" 
                    value={this.state.query} 
                    ref={input => this.input = input} 
                    onChange={this.changeInput}
                />
                <SearchResults stocks={this.props.stocks} query={this.state.query} />
            </SearchWrapper>
        );
    }
}

const SearchResults = ({ query, stocks }) => {
    return (
        <ResultList show={query.length > 0}>
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
            <a href={`/stock/${stock.symbol}`}>{stock.symbol} - {stock.name}</a>
        </ResultWrapper>
    )
}

export default Search;

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
