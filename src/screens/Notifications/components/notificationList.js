import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Import Moment
import moment from 'moment';
const styles = theme => ({
  root: {
    flexGrow: 1,
    margin:'10px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function NotificationsList(props) {
 
  const { classes } = props;
  
  const {
    showDialog,
    notification,
    notificationIndex
  } = props;

  return (
    <div className={classes.root}>
      <Grid container item spacing={24}>
        <Grid xs={8} item style={{margin:'auto'}}>
          <Paper className={classes.paper}>
          <div key={`${notification.date} | ${notification.time}`} className={classes.root}>
      <List>
        <ListItem onClick={() => showDialog(notification,notificationIndex)}>
          <img src={notification.senderPic} alt='displayPic' />
          <ListItemText primary={`${notification.senderDisplayName} (${notification.sendernickname}) wants to meet you at 
          ${notification.venue}, ${notification.address}`} secondary={moment(`${notification.senderRequestDate} ${notification.senderRequestTime}`, "MM/DD/YYYY HH:mm:ss a").fromNow()} />
        </ListItem>
      </List>
    </div>
          </Paper>
        </Grid>
       
      </Grid>
    </div>
  );
}

NotificationsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsList);