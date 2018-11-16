import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MeetingList from './meetingList';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class OuterMeetingComponent extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (e,value) => {
        this.setState({ value });
    };

    render() {
        const {
            lists,
            classes
        } = this.props;
        const { value } = this.state;
        console.log('OUTERmeeting props',lists);

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons='on'
                    >
                        <Tab label="ACCEPTED" />
                        <Tab label="CANCELLED" />
                        <Tab label="COMPLICATED" />
                        <Tab label="DONE" />
                        <Tab label="PENDING" />
                    </Tabs>
                </AppBar>
                <MeetingList 
                    value={value}
                    lists={lists}
                />
            </div>
        );
    }
}

export default withStyles(styles)(OuterMeetingComponent);