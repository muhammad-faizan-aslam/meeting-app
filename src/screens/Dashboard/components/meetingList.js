import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  root: {
    flexGrow: 1,
    margin:'10px',
    
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 5,
    width: 100,
    height: 100,
  },
});

const MeetingList = (props)=> {
 

  let list = [];

  const {
    value,
    lists,
    classes,
   
  } = props;

//  console.log('meetingLIST props',lists);

//  console.log('value',value)

  switch (value) {
    case 0:
      list = lists.accepted;
     
      break;
    case 1:
      list = lists.cancelled;
   
      break;
    case 2:
      list = lists.complicated;
      break;
    case 3:
      list = lists.done;
      break;
    case 4:
      list = lists.pending;
      break;
    default:
      break;
  }

// console.log('list',list)

  return (
      <div>
      {
          list.length 
           ?
          <div className={classes.root}>
          <Grid item container spacing={16}>
          {
              list.map((item, index)=>{
               
           return <Grid item xs={12} sm={3} key={index} >
              <Paper className={classes.paper}>
              <Grid >
            <Grid >
            <div className={classes.row}>
          <Avatar alt="ProfilePic" src={item.swappedUserDisplayPic}  className={classes.bigAvatar} />
        
        </div>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column">
                <Grid item  xs>
                  <Typography gutterBottom variant="subtitle1">
                    DISPLAY NAME : {item.swappedUserDisplayName}
                  </Typography>
                  <Typography gutterBottom>LOCATION : {item.address}</Typography>
                  <Typography color="textSecondary">DATE | TIME : {item.date} | {item.time}</Typography>

                  <Typography color="textSecondary">STATUS : {item.status} </Typography>
                </Grid>
              
              </Grid>
             
            </Grid>
          </Grid>
              </Paper>
            </Grid>
              })
          }
    
          </Grid>
        </div> 

        :

        <div>
           <Typography
            variant='display1'
            className={`${classes.textCenter} ${classes.margin}`}>  
            No Meetings Available
            </Typography>
        </div>
      }
     </div>
  );

 
}


MeetingList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeetingList);