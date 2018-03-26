import React from 'react';
import styled from 'styled-components';

const BasicStock = ({ stock }) => (
    <StockWrapper>
        <h3>{stock.name}</h3>
        <p>{stock.symbol}</p>
        <h2>{stock.latestPrice}</h2>
    </StockWrapper>
)

export default BasicStock;


// Styled Components
const StockWrapper = styled.div``;
