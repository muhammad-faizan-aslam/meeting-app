import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScreensRoute from './routes'
import firebase from './config/firebase'
// import swal from 'sweetalert'


import './App.css';
import './mystyle.css' ;



class App extends Component {

  // stackEl = React.createRef();

  constructor(props) {
    super(props);
    
    this.state = {
      isUser: false,
      loginProcess:false,
      
    }
  }
  
  checkUserLogin = ()=>{
    this.setState({
      isUser:true,
     
    })
  }

  checkLoginProcess = ()=>{
    this.setState({
      isUser:true,
      loginProcess:true,
    })
  }

  logOut = () =>{

    firebase.auth().signOut()
    .then(
      ()=>{
        this.setState({
          isUser:false
        })
        this.props.history.replace('/')
      }
    )
   

   
  }

  render() {
    
    const { isUser , loginProcess } = this.state
    
    return (
      
      <div className="App">
     
      <div>
           <ScreensRoute   ScreenRoutes={{isUser,checkUserLogin:this.checkUserLogin , logOut:this.logOut ,
            
            loginProcess , checkLoginProcess:this.checkLoginProcess }}/>
        </div>
      </div>
        

    );
  
  
  }
  

  
}
  




export default withRouter(App);
