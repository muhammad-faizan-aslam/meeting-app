import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import firebase from './config/firebase'
import ScreensRoute from './routes'
// import swal from 'sweetalert'

import './App.css';
import './mystyle.css' ;


class App extends Component {

  constructor(props){
    super(props)


    
}

  render() {
    
    
    return (
      
      <div className="App">
      
         
       
                  

            <h1>HELLO REACT</h1>

            
          
          
            

<div>
           <ScreensRoute/>
        </div>
      </div>
        

    );
  
  
  }
  

  
}
  




export default withRouter(App);
