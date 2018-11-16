import React, { Component } from 'react';
import firebase from '../../config/firebase'
// import PersonAdd from '@material-ui/icons/PersonAdd';

// import PrimarySearchAppBar from '../../Components/DashboardHeader/AppbarHeader'
import { withRouter } from 'react-router-dom';
import OuterMeeting from './components/outerMeeting'


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myData : this.props.history.location.state ,
        meetings: {
            accepted: [],
            cancelled: [],
            complicated: [],
            done: [],
            pending: []
        }
    }
    

    
    };

    componentDidMount() {
        const user = firebase.auth().currentUser ;
        const userID = localStorage.getItem('userID')
        // const { meetings , myData } = this.state;
        const { state } = this.props.history.location ;
        // myData = state ;
      
        console.log("dashboard props", state )
    
           

            
        if(user || userID ){
           
            const { state } = this.props.history.location ;
           
            console.log('dasboard userid',userID)
           
            firebase.database().ref(`Users/${userID}`)
        .once('value', user => {
            console.log('dashboard meeting lists',user.val())
            if (user.val().meetings) {
                this.setState({
                    myData : state || user.val()  ,
                    // isMeeting : state.isMeeting || '' ,
                })
                const meetingsList = user.val().meetings;
                console.log('dashboard meeting lists',meetingsList)
                const { meetings } = this.state;

                    meetingsList.forEach(meeting => {
                        switch(meeting.status) {
                            case 'accepted':
                                meetings.accepted.push(meeting);
                                break;
                            case 'cancelled':
                                meetings.cancelled.push(meeting);
                                break;
                            case 'complicated':
                                meetings.complicated.push(meeting);
                                break;
                            case 'done':
                                meetings.done.push(meeting);
                                break;
                            case 'pending':
                                meetings.pending.push(meeting);
                                break;
                            default:
                                break;
                        };
                    });

                    this.setState({
                        meetings
                    });

                    console.log('dashboard meeting lists',meetings)
                };

               
            });
      
            console.log("dashboard props", state )
           
    
            this.setState({
                myData : state || '' ,
                // isMeeting : state.isMeeting || '' ,
            })
            // this.props.history.push('/dashboard')
        }
        else{
            
            this.props.history.push('/',{})
        }
        
     
        
        
    };

  

    gotoCard(){

        
        const { state } = this.props.history.location ;
     
        this.props.history.push(`/recommendedpeople`,state)
    }


   
    
    render() {
        const {
            classes
        } = this.props;

        const {
            meetings,
            isLoading,
            myData , 
            isMeeting
        } = this.state;
      
        return (
            <div>
               
                <h1>Dashboard</h1>
                <h4>{ myData && myData.displayName}</h4>

               
                    <button type="button" 
                
                    onClick={()=> this.gotoCard() }
                    className="btn btn-large btn-success">SET A MEETING</button>
                <br/>
                <br/>

             
                <OuterMeeting
                    
                        lists={meetings}
                />
            
               
               
                
            </div>
        );
    }
}


export default withRouter(Dashboard);
