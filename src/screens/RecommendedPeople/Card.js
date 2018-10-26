import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import firebase from '../../config/firebase'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const tutorialSteps = [
// //   {
// //     label: 'San Francisco – Oakland Bay Bridge, United States',
// //     imgPath:
// //       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
// //   },
// //   {
// //     label: 'Bird',
// //     imgPath:
// //       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
// //   },
// //   {
// //     label: 'Bali, Indonesia',
// //     imgPath:
// //       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
// //   }
  
// ];

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
     tutorialSteps : [] ,
     userObj:[]

  };

  componentDidMount(){

        const { tutorialSteps }  = this.state ;
    
      let db = firebase.database();
      db.ref(`Users/lwjftxk8dJguGUdLzSN2nlO7rH83`)
      .once('value',res=>{
          console.log('res',res.val().userDetails)
          let imgurl = res.val().userDetails.imagesUrlArr ;
          
          imgurl.map(url=>{
              let obj = {};
              obj.imgPath = url 
              console.log('obj img',obj)
               tutorialSteps.push(obj)
              console.log("url",url)
                this.setState({
                    tutorialSteps
                })
          })
      })
  }
  
  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep , tutorialSteps } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}  style={{margin:'auto',border:'2px solid red',paddingBottom:'2%',borderRadius:'10px'}} >
        <Paper square elevation={0} className={classes.header}>
         
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={step.imgPath} alt={step.label} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
       
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" style={{background:'green',color:"white",borderRadius:'50px'}}>
              YES
            
            </Button>
          }
          backButton={
            <Button size="small"  style={{background:'red',color:"white",borderRadius:'50px'}} >
           
              NO
            </Button>
          }
        />
         <Typography  variant="display1"  align={"center"}>  FULLNAME </Typography>
        <Typography  variant="title" color="secondary"  align={"center"}>  NICKNAME </Typography>
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
