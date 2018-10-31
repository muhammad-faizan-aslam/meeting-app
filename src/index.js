import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import App from './App1';
// import SwipeableTextMobileStepper from './card'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


if (module.hot) {
    module.hot.accept();
}




ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));

// ReactDOM.render(<BrowserRouter><SwipeableTextMobileStepper/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();



// if(module.hot){
//     module.hot.accept();
// }