import React, { Component } from 'react';
import firebase from '../../config/firebase'

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
        const{userObj} = this.state;
        console.log("chala")
        this.props.history.push(`/recommendedpeople`,{userObj})
    }


    componentDidMount() {
        console.log("dashboard props",this.props.history.location.state.userData.userDetails)

        this.setState({
            userObj : this.props.history.location.state.userData.userDetails || '' ,
            isMeeting : this.props.history.location.state.userData.userDetails.meetingset
        })

    }
    
    render() {
        const { userObj , isMeeting} = this.state;
        return (
            <div>
                <h1>Dashboard</h1>
                <h4>{ userObj && userObj.userInfo.displayName}</h4>

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