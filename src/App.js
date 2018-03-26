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



    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
                        <h1 className="App-title">Restock</h1>
                    </header>
                    <Search />
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
