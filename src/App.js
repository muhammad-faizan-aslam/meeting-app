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
      notifications:[]
      
    }
  }

  componentDidMount(){
    const userID = localStorage.getItem('userID')

    
    if(userID){
      this.setState({
        isUser:true,
       
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const userID = localStorage.getItem('userID')

    if (this.state.isUser)
      if (prevState.isUser !== this.state.isUser)
        firebase.database().ref(`Users/${userID}`)
          .once('value', userData => {
            if(userData.val()){
              const notifications = userData.val().notifications || [];

              this.setState({
                notifications
              });
            }
         

          });
  };
  checkUserLogin = ()=>{
    this.setState({
      isUser:true,
     
    })
    localStorage.setItem('isUser',true)
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
        localStorage.setItem('isUser',false)
        localStorage.removeItem('userID')
        this.props.history.replace('/')
      }
    )
   

   
  }

  render() {
    
    const { isUser , loginProcess , notifications} = this.state
    
    return (
      
      <div className="App">
     
      <div>
           <ScreensRoute   ScreenRoutes={{isUser,checkUserLogin:this.checkUserLogin , logOut:this.logOut ,
            
            loginProcess , checkLoginProcess:this.checkLoginProcess , notifications}}/>
        </div>
      </div>
        

    );
  
  
  }
  

  
}
  




export default withRouter(App);
