import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';



const styles = theme => ({
  root: {
    width: '100%',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  secondaryText: {
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    background: 'transparent',
    color: '#FE6B8B',
    boxShadow: 'none',
  },
  round: {
    borderRadius: '50%',
  },
  margin: {
      marginTop: theme.spacing.unit * 2
  },
  textCenter: {
      textAlign: 'center',
  },
});

const MeetingList = (props) => {
  let list = [];

  const {
    value,
    lists,
    classes,
   
  } = props;

 console.log('meetingLIST props',lists);

//  const singlelist = lists.padding ;
 console.log('list single',lists.pending);
 console.log('value',value)

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
  
  return (
    <div>
  {

list.length ?
        
      <div>
           <table class="responsive-table" class="centered" >
        <thead>
          <tr>
              <th>IMAGE</th>
              <th>USERNAME</th>
              <th>STATUS</th>
              <th>LOCATION</th>
              <th>DATE & TIME</th>
              
          </tr>
        </thead>

        <tbody>
        {
    list.map(item =>
          <tr style={{textAlign:'center'}} >
            <td>
               
                <img src={item.swappedUserDisplayPic} alt="" className="responsive-img circle"/>

               
            </td>
            <td>{item.swappedUserDisplayName}</td>
            <td>{item.status}</td>
            <td>{item.address}</td>
            <td> {item.date} | {item.time}</td>
          </tr>
    )}
          
        </tbody>
      </table>

       
      </div>
   
:
<div>
<Typography
        variant='display1'
        className={`${classes.textCenter} ${classes.margin}`}
    >
        No Meetings Available
    </Typography>
</div>
   
     
    }
   </div>
   
  );
}

export default withStyles(styles)(MeetingList);