import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch, 
} from 'react-router-dom';

//import Loader from './components/Loader';
import Search from './components/Search';
import Home from './Home';
import StockPage from './StockPage';

const API_BASE = 'https://api.iextrading.com/1.0';
const SYMBOLS_ROUTE = '/ref-data/symbols';

class App extends Component {
    state = {
        stocks: [],
    }

    async componentDidMount() {
        const res = await fetch(API_BASE + SYMBOLS_ROUTE);
        const stocks = await res.json();
        this.setState({ stocks });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
                    <h1 className="App-title">Restock</h1>
                </header>
                <Search stocks={this.state.stocks} />
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/stock/:symbol" component={StockPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
