import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './components/ProductList';
import Basket from './components/Basket';
import NotFound from './components/NotFound';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {getAllProducts} from './actions/products';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

store.dispatch(getAllProducts());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ProductList}/>
                <Route path="/basket" exact component={Basket}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
