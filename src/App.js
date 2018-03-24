import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch, 
    Link,
} from 'react-router-dom';

//import Loader from './components/Loader';
import Search from './components/Search';
import Home from './Home';
import StockPage from './StockPage';

const API_BASE = 'https://api.iextrading.com/1.0';
const SYMBOLS_ROUTE = '/ref-data/symbols';

class App extends Component {
    // state = {
    //     stocks: [],
    // }

    constructor(props) {
        super(props);

        let stocks = [];

        const store = window.localStorage;
        if (store.getItem('symbols')) {
            stocks = JSON.parse(store.getItem('symbols'));
        }

        this.state = {
            stocks
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

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
                        <h1 className="App-title">Restock</h1>
                    </header>
                    <Search stocks={this.state.stocks} />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/stock/:symbol" component={StockPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
