import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import App from './App';
import Login from './login';

ReactDOM.render(
    <Router>
        <div>
            <aside>
                Hi, there!
                <Link to={`/`}>App</Link>
                <Link to={`/login`}>Login</Link>
            </aside>
            <main>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
            </main>
        </div>
    </Router>,
    document.getElementById('root')
);
