import React, { Component } from 'react';
import firebase from '../../config/firebase'
import PrimarySearchAppBar from '../../Components/DashboardHeader/DashboardHeader'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
        
    }

    sign(){
        alert('work')
        console.log('props dashboard',this.props)
        firebase.auth().signOut().then(()=> {

            this.props.history.replace('/',{})
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }

    gotoCard(){

        
        const { state } = this.props.history.location ;
     
        this.props.history.push(`/recommendedpeople`,state)
    }


    componentDidMount() {
        const user = firebase.auth().currentUser;
        // if(user){
           
        //     const { state } = this.props.history.location ;
      
        //     console.log("dashboard props", state )
    
        //     this.setState({
        //         myData : state || '' ,
        //         isMeeting : state.isMeeting
        //     })
        // }
        // else{
            
        //     this.props.history.push('/',{})
        // }
        
    }
    
    render() {
        const { myData , isMeeting} = this.state;
        return (
            <div>
                <div>
                    <PrimarySearchAppBar/>
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
                <button type="button" 
                
                onClick={()=> this.sign() }
                className="btn btn-large btn-primary">LOGOUT</button>
                
            </div>
        );
    }
}


export default Dashboard;
