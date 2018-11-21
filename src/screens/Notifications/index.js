import React from 'react';
import NotificationsList from './components/notificationList';
import RequestDialog from './components/requestDialog';
import CalendarDialog from './components/addToCalender'
import firebase from '../../config/firebase'
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert2'


class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialog: false,
            isShowCalendarDialog:false
        };
    
          this.requestAccept = this.requestAccept.bind(this);
    }
    
   

    showDialog = (notification,notificationIndex) => {

        if(notification.status === 'accepted')
        return swal('YOU ARE ALREADY ACCEPTED REQUEST')
        
        this.setState({
            isDialog: true,
            notification,
            notificationIndex
        });
    };

    closeDialog = () => {
        this.setState({
            isDialog: false
        });
    };

   async requestAccept(requestUserId,requestMeetingIndex){

        const { notificationIndex } = this.state;
        alert(`hn accept`)
       await firebase.database().ref(`Users/${localStorage.getItem('userID')}/notifications/${notificationIndex}`)
        .update({
            status:'accepted'
        })

        await  firebase.database().ref(`Users/${requestUserId}/meetings/${requestMeetingIndex}`)
        .update({
            status:'accepted'
        })
        this.setState({
            isDialog: false,
            isShowCalendarDialog: true
        });

        // console.log('requestAccept' , notificationIndex)
    }

    closeCalendarDialog = () => {
        this.setState({
            isShowCalendarDialog : false
        })
    }

    render() {
        const {
            isDialog,
            notification,
            isShowCalendarDialog,
            notificationIndex
        } = this.state;
        const {
            notifications
        } = this.props.Notifications;
     
        // console.log('notifications from componets',notifications[notificationIndex])

        return (
            <div>
                {
                    isShowCalendarDialog &&

                    <CalendarDialog
                    open={isShowCalendarDialog}
                    close={this.closeCalendarDialog}
                    event={{
                        title: `MEETING ${notifications[notificationIndex].senderDisplayName}`,
                        description: `YOU ARE ACCEPT MEETING REQUESTED WITH ${notifications[notificationIndex].senderDisplayName}`,
                        location:`${notifications[notificationIndex].venue}`,
                        startTime: `2018-12-16T20:15:00-04:00`,
                        endTime :'2018-12-16T21:45:00-04:00'
                        // endTime: `${notifications[notificationIndex].senderRequestTime}`
                    }}
                    listItems={[
                        { google: 'Google' },
                        { outlookcom: 'Outlook' },
                        { yahoo: 'Yahoo' },
                      
                    ]}
                    
                    />

                }
                { notifications.length === 0 ?

                <Typography component="h2" variant="display1" gutterBottom>
                loading.....
                </Typography>
                   :
                    notifications.map((notification,index) => 
                        <NotificationsList
                            key={index}
                            notificationIndex={index}
                            notification={notification}
                            showDialog={this.showDialog}
                        />
                    )
                }
                {
                    isDialog && 
                    <RequestDialog 
                        open={isDialog}
                        close={this.closeDialog}
                        requestAccept={this.requestAccept}
                        request={notification}
                    />
                }
            </div>
        );
    };
};

export default Notifications;