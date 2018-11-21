import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DateAndTime from './components/DateAndTime';
import swal from 'sweetalert2'

import firebase from '../../../../../config/firebase';

class DateAndTimeDialog extends React.Component {
    state = {
        selectedDate: new Date(),
        open: false,
      
    };

    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        });
    };

    sendRequestForMeeting = (selectedPlace) => {
        const {
            selectedDate
        } = this.state;

        const {
            closeDateAndTimeDialog,
            swappedUserId,
            swappedUserNickName,
            swappedUserDisplayName,
            swappedUserDisplayPic
        } = this.props.DateAndTimeDialog;

        const date = selectedDate.toLocaleDateString();
        const time = selectedDate.toLocaleTimeString();
        const status = 'pending';

        
         firebase.database().ref(`Users/${localStorage.getItem('userID')}`)
            .once('value', mySnapshot => {
                
                const sender = mySnapshot.val();
                const meetings = mySnapshot.val().meetings || [];
                // console.log('datentimedialog',mySnapshot.val());

              

                meetings.push({
                    date,
                    time,
                    status,
                    ...selectedPlace,
                    swappedUserNickName,
                    swappedUserDisplayName,
                    swappedUserId,
                    swappedUserDisplayPic,
                    requestDate: new Date().toLocaleDateString(),
                    requestTime: new Date().toLocaleTimeString()
                });
                // console.log('meetings',meetings);

                firebase.database().ref(`Users/${localStorage.getItem('userID')}`)
                    .update({

                        meetings
                    }
                    )
                    .then(() => {
                        firebase.database().ref(`Users/${swappedUserId}`)
                            .once('value', snapshot => {
                                const notifications = snapshot.val().notifications || [];

                                notifications.push({
                                    date,
                                    time,
                                    status,
                                    ...selectedPlace,
                                    senderDisplayName:sender.displayName,
                                    sendernickname:sender.nickname,
                                    senderMeetingIndex:notifications.length,
                                    senderId:sender.userId,
                                    senderPic:sender.profilePic,
                                    senderRequestDate: new Date().toLocaleDateString(),
                                    senderRequestTime: new Date().toLocaleTimeString()
                                });

                                firebase.database().ref(`Users/${swappedUserId}`)
                                    .update({
                                        notifications
                                    })
                                    .then(() => {
                                        swal({
                        
                                            type: 'success',
                                            title: 'MEETING REQUEST SUCCESSFULY SENT',
                                            showConfirmButton: false,
                                            timer: 1000
                                          })
                                       
                                        closeDateAndTimeDialog();
                                    })

                            });
                    })
            });
    };

    render() {
        const {
            classes,
            selectedPlace,
            isDateAndTimeDialog,
            closeDateAndTimeDialog
        } = this.props.DateAndTimeDialog;

        const {
            fullScreen
        } = this.props;

        return (
            <form>
                <Dialog
                    fullScreen={fullScreen}
                    open={isDateAndTimeDialog}
                    onClose={closeDateAndTimeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Select date & time for meeting.</DialogTitle>
                    <DialogContent>
                        <DateAndTime
                            onChange={this.handleDateChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type='submit'
                            className={classes.button}
                            onClick={() => this.sendRequestForMeeting(selectedPlace)}
                            style={{ color:"blue"}}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        );
    }
}

export default withMobileDialog({ breakpoint: 'xs' })(DateAndTimeDialog);