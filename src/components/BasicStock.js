import React from 'react';
import styled from 'styled-components';
import withStockInfo from '../containers/withStockInfo';

const BasicStock = ({ stock }) => (
    <StockWrapper>
        <h3>{stock.companyName}</h3>
        <p>{stock.symbol}</p>
        <h2>{stock.latestPrice}</h2>
    </StockWrapper>
)

export default withStockInfo(BasicStock);


// Styled Components
const StockWrapper = styled.div``;
