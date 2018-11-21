import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../config/firebase';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import swal from 'sweetalert';
import APPLOGO from '../../Components/AppLogo/AppLogo'


const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });
  
function loginEmail(){
    swal('LOGIN WITH FACEBOOK')
}  





function loginFb(history, checkUserLogin,checkLoginProcess){
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result)=> {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
     let user = result.user;
          // console.log('user',user)
     localStorage.setItem('userID',user.uid)
      let db = firebase.database()
      db.ref(`Users/${user.uid}`)
      .once("value",res=>{

               const userData = res.val()
               
// console.log('firebase user',res.val())
// console.log("key user",res.key)
// console.log("uid user",user.uid)

         if(userData){
                  history.replace('/dashboard',
                    res.val()
                  )

                  checkUserLogin()
          }  else {
             history.replace('/NameAndPhoneno',{
                  displayName: user.displayName,
                  userId : user.uid ,
                  email : user.email ,
                  profilePic: user.photoURL
              })
              checkUserLogin()
              // checkLoginProcess()
          }
          
      })
    
  
     
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
 
 
 
}  


 const SignIn = (props) => {
    const { classes , history , checkUserLogin , checkLoginProcess } = props;
// console.log('login props',props)
  
    return (

      
      <div>
      
        
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            
            <APPLOGO/>

            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus disabled/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password"  >Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  disabled
                />
              </FormControl>
           
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>{loginEmail()}}
              
              >
                Sign in
              </Button>

               <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>{loginFb(history,checkUserLogin, checkLoginProcess)}}

              >
                Login With Facebook
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    
     
      
      </div>
    );
  }
  
  SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
  };




  export default withStyles(styles)(withRouter(SignIn));
  