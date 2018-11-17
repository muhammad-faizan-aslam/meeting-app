import React , { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import firebase from '../../config/firebase'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class  SimpleTable extends Component {
        constructor(props){
            super(props)
            this.state = {
                notificationRow:[]
            }
        }


        componentDidUpdate(){
            const { notificationRow } = this.state
            const userID = localStorage.getItem('userID');
            firebase.database().ref(`Users/${userID}`)
            .once('value', user => {
                if(user.val().notifications)
                {
                //  const notifications = user.val().notifications ;
                this.setState({
                    notificationRow : user.val().notifications
                })
                }
              
            })
        }

     acceptReq = (senderID)=>{
         console.log('senderid',senderID)

         firebase.database().ref(`Users/${senderID}/meetings`)
         .once('value',data=>{
             console.log('data accept',data.val())
             data.val().map(singleReq=>{
                
                 if(singleReq.swappedUserId){
                     const key = data.key
                     console.log('hn hai id',singleReq);

                     const accept=[];
                     accept.push({
                        status : 'accepted'
                     })


                 }
             })
            // const userID = localStorage.getItem('userID');

         })
                // alert('ok hai',senderID)

        }

        render (){

            const { classes } = this.props;
            const { notificationRow } = this.state
            return (
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>IMAGE</TableCell>
                        <TableCell >USERNAME</TableCell>
                        <TableCell >STATUS</TableCell>
                        <TableCell >MEETING DATE & TIME</TableCell>
                       
                        <TableCell >ACTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { notificationRow && notificationRow.map(row => {
                        return (
                          <TableRow key={row.senderId}>
                            <TableCell >
                            {row.senderId}
                            {/* <img src={row.senderPic} alt="" className="responsive-img circle"/> */}
                            </TableCell>
                            <TableCell >{row.senderDisplayName}</TableCell>
                            <TableCell >{row.status}</TableCell>
                            <TableCell >{row.date} | {row.time}</TableCell>
                            {/* <TableCell >{row.protein}</TableCell> */}
                            <TableCell >
                            <Button variant="contained" color="primary" className={classes.button}>
                            DECLINE
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button}
                        onClick={()=>this.acceptReq(row.senderId)}
                        >
                            ACCEPT
                        </Button>
                        </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              );
        }
 

  
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);