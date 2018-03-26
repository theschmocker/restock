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
    constructor(props) {
        super(props);
        this.state = {
            savedStocks: this.getSavedStocks(),
            stockMethods: {
                addStock: this.addStock,
            }
        }    
    }

    getSavedStocks = () => {
        try {
            const serializedStocks = localStorage.getItem('savedStocks');
            return JSON.parse(serializedStocks) || [];
        } catch (err) {
            console.log(err);
            // if getItem fails, return an empty array
            return [];
        }
    }

    addStock = (stock) => {
        const savedStocks = this.getSavedStocks();    
        const nextStocks = [...savedStocks, stock];
        try {
            const serialized = JSON.stringify(nextStocks);
            localStorage.setItem('savedStocks', serialized);
            this.setState({ savedStocks: nextStocks });
        } catch (err) {
            console.log(err);
        }
    }   // }

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
                        <h1 className="App-title">Restock</h1>
                    </header>
                    <Search savedStocks={this.state.savedStocks} stockMethods={this.state.stockMethods}/>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <Home savedStocks={this.state.savedStocks} />
                        )}/>
                        <Route path="/stock/:symbol" component={StockPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
