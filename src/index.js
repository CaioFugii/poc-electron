import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'
//usar Hashrouter e não BrowserRouter, pq vc não está trabalhando no navegador

import Home from "./App"
import About from "./pages/about"

ReactDOM.render(
    <Router>
        <div>
            <main>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </main>
        </div>
    </Router>, 
    document.getElementById("root")
    
)
