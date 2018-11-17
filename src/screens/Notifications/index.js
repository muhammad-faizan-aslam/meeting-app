import React from 'react';
import NotificationsList from './components/notificationList';
import RequestDialog from './components/requestDialog';

class Notifications extends React.Component {
    state = {
        isDialog: false
    };

    showDialog = (notification) => {
        this.setState({
            isDialog: true,
            notification
        });
    };

    closeDialog = () => {
        this.setState({
            isDialog: false
        });
    };

    render() {
        const {
            isDialog,
            notification
        } = this.state;

        const {
            notifications
        } = this.props.Notifications;

        console.log('notifications from componets',notifications)

        return (
            <div>
                {
                    notifications.map(notification => 
                        <NotificationsList
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
                        request={notification}
                    />
                }
            </div>
        );
    };
};

export default Notifications;