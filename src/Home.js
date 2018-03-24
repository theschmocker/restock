import React, { Component } from 'react';

import SavedStocks from './components/SavedStocks';

//import Loader from './components/Loader';

//const API_BASE = 'https://api.iextrading.com/1.0';

class Home extends Component {
    render() {
        return (
            <SavedStocks />
        );
    }
}

export default Home;
