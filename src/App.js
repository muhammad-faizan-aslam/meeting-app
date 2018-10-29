import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScreensRoute from './routes'
// import swal from 'sweetalert'


import './App.css';
import './mystyle.css' ;



class App extends Component {

  stackEl = React.createRef();

  constructor(props) {
    super(props);
    
    this.state = {
     
    }
  }
  

  render() {
    
    
    return (
      
      <div className="App">
     
      <div>
           <ScreensRoute/>
        </div>
      </div>
        

    );
  
  
  }
  

  
}
  




export default withRouter(App);
