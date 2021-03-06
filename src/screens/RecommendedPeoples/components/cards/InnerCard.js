import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const styles = {
    textCenter: {
        textAlign: 'center'
    },
    card: {
        maxWidth: 500,
      },
};

class InnerCard extends React.Component {

    render() {
        const {
            onClickCheck,
            onClickCross,
            recommendedUser,
            key
        } = this.props.InnerCard;

        // console.log('innercard props',this.props);
        
        const {
            classes
        } = this.props;

        // console.log('key inner card',key)

        return (
            <div  key={key} > 
            <Card className={classes.card} key={key}>
                <Carousel
                    // autoPlay={true}
                    infiniteLoop={true}
                    emulateTouch={true}
                    swipeable={true}
                    showArrows={true}
                    showThumbs={false}>
                    {
                        recommendedUser.imagesUrlArr.map((path,index) => <img src={path} className='img-responsive'
                        style={{width:'300px',height:'300px'}}
                        alt="userImg" key={index} />)
                    }
                </Carousel>
                    <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">

                    <Grid  item xs={2}>
                        <IconButton aria-label="Add to favorites"   onClick={onClickCross}   >
                            <CloseIcon  />
                        </IconButton>
                    </Grid>
                    <Grid  item xs={8}>
                        <CardContent>
                            <Grid >
                                <Typography variant="subtitle1" className={classes.textCenter}>
                              
                                <b>{recommendedUser.displayName}</b>
                               
                                   
                                </Typography>
                            </Grid>
                            <Grid >
                                <Typography variant="subtitle2" color='secondary' className={classes.textCenter}>{recommendedUser.nickname}</Typography>
                            </Grid>
                        </CardContent>
                    </Grid>
                    <Grid  item xs={2}>
                        <IconButton aria-label="Share"   onClick={onClickCheck} >
                            <CheckIcon />
                        </IconButton>
                    </Grid>

                </Grid>
                </div>
            </Card>
            </div>
        );
    }
}

export default withStyles(styles)(InnerCard);