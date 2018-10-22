import React, { Component } from 'react';
import firebase from '../../config/firebase';


class LoginFb extends Component {



    loginFb(){
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=> {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log('user',user)

            this.props.history.replace('/Form1',{
                displayName: user.displayName,
                userId : user.uid ,
                email : user.email 
            })
        
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // The email of the user's account used.
            // var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
          });
       
       
        // this.props.history.push('/Form1')
    }  
    
    render() {
        console.log("login props",this.props.history)
        return (
         
            <div>
                
                <button type="button" className="btn btn-large btn-block btn-primary" 
                onClick={()=>{this.loginFb()}}
                >LOGIN WITH FACEBOOK</button>
                
            </div>
        );
    }
}

export default LoginFb;