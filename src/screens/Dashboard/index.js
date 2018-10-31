import React, { Component } from 'react';
import firebase from '../../config/firebase'
// import PrimarySearchAppBar from '../../Components/DashboardHeader/AppbarHeader'
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
        
    }

    signOUT(){
        alert('work')
        console.log('props dashboard',this.props)
        // console.log('props dashboard',this.props.history)
        firebase.auth().signOut().then(()=> {

            this.props.history.replace('/',{})
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
            console.log('error',error)
          });
    }

    gotoCard(){

        
        const { state } = this.props.history.location ;
     
        this.props.history.push(`/recommendedpeople`,state)
    }


    componentDidMount() {
        const user = firebase.auth().currentUser ;
      
        const { state } = this.props.history.location ;
      
            console.log("dashboard props", state )
    
            this.setState({
                myData : state || '' ,
                isMeeting : state.isMeeting
            })
        if(user){
           
            const { state } = this.props.history.location ;
      
            console.log("dashboard props", state )
            // localStorage.setItem('isUser',JSON.stringify(state))
    
            this.setState({
                myData : state || ''  ,
                isMeeting : state.isMeeting || '',
            })
            // this.props.history.push('/dashboard')
        }
        else{
            
            this.props.history.push('/',{})
        }
        
    }
    
    render() {
        const { myData , isMeeting} = this.state;
        return (
            <div>
                <div>
                    {/* <PrimarySearchAppBar myData={myData} signOUT={this.signOUT} /> */}
                </div>
                <h1>Dashboard</h1>
                <h4>{ myData && myData.displayName}</h4>

                {   ! isMeeting &&
                    <button type="button" 
                
                    onClick={()=> this.gotoCard() }
                    className="btn btn-large btn-success">SET A MEETING</button>
                }
                <br/>
                <br/>
                {/* <button type="button" 
                
                onClick={()=> this.signOut() }
                className="btn btn-large btn-primary">LOGOUT</button> */}
                
            </div>
        );
    }
}


export default withRouter(Dashboard);
