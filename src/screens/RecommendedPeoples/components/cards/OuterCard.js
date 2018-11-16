import React from 'react';
import Cards, { Card as CardForSwipe } from 'react-swipe-deck';
import firebase from '../../../../config/firebase';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GeoFire from 'geofire';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import InnerCard from './InnerCard';

//Import Constants
import { BASE_URL, CLIENT_ID, CLIENT_SECRET, VERSION } from '../../../../constants/fourSquare';

//Import Dialogs
import ConfirmationDialog from '../dialogs/ConfirmationDialog';
import VenueDetailsDialog from '../dialogs/VenueDetailsDialog';
import DateAndTimeDialog from '../dialogs/DateAndTimeDialog';

//Import Snackbar
import SendRequestSnackbar from '../snackbars/SendRequestSnackbar.js';

const styles = theme => ({
    button: {
        width: '100%',
        float: 'left',
        background: 'transparent',
        color: '#FE6B8B',
        boxShadow: 'none',
    },
    textfield: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    }
});

class SwipeableCard extends React.Component {

    state = {
        recommendedUsers: [],
        recommendedPlaces: [],
        selectedPlace: [],
        swappedUserId: '',
        swappedUserNickName: '',
        swappedUserDisplayName: '',
        swappedUserDisplayPic: '',
        isConfirmDialog: false,
        isVenueDetailsDialog: false,
        isDateAndTimeDialog: false,
        isSnackbar: false
    }

    componentDidMount() {
        const myUId = firebase.auth().currentUser && firebase.auth().currentUser.uid || localStorage.getItem('userID');
      
        firebase.database().ref(`Users/${myUId}`)
            .once('value', me => {
                const myObj = me.val();
                console.log('myobj=====>',myObj)
                const myDrinks = myObj.beverages;
                const myTimes = myObj.timeduration;
                const myLat = myObj.latitude;
                const myLng = myObj.longitude;

                firebase.database().ref(`Users`)
                    .once('value', restUsers => {
                        console.log('restUsers=====>',restUsers.val())
                        restUsers.forEach(user => {
                            const userObj = user.val();
                           
                            const userDrinks = userObj.beverages;
                            const userTimes = userObj.timeduration;
                            const userLat = userObj.latitude;
                            const userLng = userObj.longitude;

                            //If mine response
                            if (me.key === user.key)
                            return;
                            console.log('me.key === user.key',me.key +'=========='+ user.key)

                            // //Drinks Check
                            if (myDrinks.some(drink => userDrinks.includes(drink))) {
                                console.log('drink => userDrinks.includes(drink)')
                                //Duration Check
                                if (myTimes.some(time => userTimes.includes(time))) {
                                    console.log('(myTimes.some(time => userTimes <= time)')
                                    // return;
                                }
                            //     // Distance Check <= 5KM
                                if (GeoFire.distance([myLat, myLng], [userLat, userLng]) <= 5)
                                console.log('GeoFire.distance([myLat, myLng], [userLat, userLng]) > 5')
                                // return;

                                const {
                                    recommendedUsers
                                } = this.state;

                                recommendedUsers.push({ ...user.val(), uid: user.key });
                                console.log('recommendedUsers',recommendedUsers)
                                this.setState({
                                    recommendedUsers
                                })

                                console.log('recommendedUsers',recommendedUsers)

                               
                            }
                        
                        });
                    })
                    .then(() => {
                        this.setState({
                            myLat,
                            myLng
                        })
                        console.log('then======>')
                    });
            });
    }

    confirm = (swappedUser) => {
        this.setState({
            isConfirmDialog: true,
            swappedUserId: swappedUser.uid,
            swappedUserNickName: swappedUser.nickname,
            swappedUserDisplayName: swappedUser.displayName,
            swappedUserDisplayPic: swappedUser.profilePic
        });

        console.log('confirm',swappedUser)
    };

    rejectUser = () => {

    }

    closeConfirmDialog = (bool) => {
        const {
            myLat,
            myLng
        } = this.state;

        if (bool) {
            const SEARCH_TERM = 'explore';
            const ll = `${myLat},${myLng}`;
            var instance = axios.create({
                baseURL: BASE_URL
            });
            instance.get(`${SEARCH_TERM}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}&ll=${ll}&limit=3`)
                .then(result => {
                    const recommendedPlaces = result.data.response.groups[0].items;
                    this.setState({
                        nearestPlaces: recommendedPlaces,
                        recommendedPlaces
                    });
                })
                .catch(err => console.log(err));
        }
        this.setState({
            isConfirmDialog: false,
            isVenueDetailsDialog: bool
        })
    }

    closeVenueDetailsDialog = () => {
        this.setState({
            isVenueDetailsDialog: false
        })
    }

    searchPlaces = (placeSearchTerm) => {
        const {
            myLat,
            myLng
        } = this.state;

        const SEARCH_TERM = 'search';
        const ll = `${myLat},${myLng}`;

        var instance = axios.create({
            baseURL: BASE_URL
        })
        instance.get(`${SEARCH_TERM}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}&ll=${ll}&query=${placeSearchTerm}`)
            .then(result => {
                this.setState({
                    recommendedPlaces: result.data.response.venues
                });
            })
            .catch(err => console.log(err));
    };

    setNearestPlaces = () => {
        const {
            nearestPlaces
        } = this.state;

        this.setState({
            recommendedPlaces: nearestPlaces
        });
    };

    showDateAndTimeDialog = (selectedPlace) => {
        this.setState({
            isVenueDetailsDialog: false,
            isDateAndTimeDialog: true,
            selectedPlace
        });
    };

    closeDateAndTimeDialog = () => {
        this.setState({
            isDateAndTimeDialog: false,
            isSnackbar: true
        })
    }


    onClickCheck = (swappedUser) => {
        const {
            removeCard
        } = this.swipeCard;

        const {
            confirm
        } = this;

        removeCard();
        confirm(swappedUser);
    };

    onClickCross = () => {
        const {
            removeCard
        } = this.swipeCard;

        removeCard();
    };

    render() {
        const {
            myLat,
            myLng,
            recommendedUsers,
            recommendedPlaces,
            selectedPlace,
            swappedUserId,
            swappedUserNickName,
            swappedUserDisplayName,
            swappedUserDisplayPic,
            isConfirmDialog,
            isVenueDetailsDialog,
            isDateAndTimeDialog,
            isSnackbar
        } = this.state;

        const {
            classes
        } = this.props;
        
        return (
            <div>
                <ConfirmationDialog
                    ConfirmationDialog={{
                        classes,
                        isConfirmDialog,
                        closeConfirmDialog: this.closeConfirmDialog
                    }}
                />
                <VenueDetailsDialog
                    VenueDetailsDialog={{
                        myLat,
                        myLng,
                        classes,
                        isVenueDetailsDialog,
                        recommendedPlaces,
                        closeVenueDetailsDialog: this.closeVenueDetailsDialog,
                        showDateAndTimeDialog: this.showDateAndTimeDialog,
                        searchPlaces: this.searchPlaces,
                        setNearestPlaces: this.setNearestPlaces,
                    }}
                />
                <DateAndTimeDialog
                    DateAndTimeDialog={{
                        classes,
                        selectedPlace,
                        swappedUserId,
                        swappedUserNickName,
                        swappedUserDisplayName,
                        swappedUserDisplayPic,
                        isDateAndTimeDialog,
                        closeDateAndTimeDialog: this.closeDateAndTimeDialog
                    }}
                />
                {
                    recommendedUsers.length !== 0 &&
                    <div style={{margin:'auto',width:'300px'}}>
                    <Cards size={[300, 430]}
                        cardSize={[300, 400]} 
                        onEnd={this.rejectUser} 
                        ref={SwipeCards => this.swipeCard = SwipeCards}
                        className='master-root'>
                        {
                            recommendedUsers.map(recommendedUser =>
                                <CardForSwipe
                                    key={recommendedUser.userId}
                                    onSwipeLeft={this.rejectUser}
                                    onSwipeRight={() => this.confirm(recommendedUser)}
                                >
                                    <InnerCard  key={recommendedUser.userId}  InnerCard={{ recommendedUser,
                                        onClickCross: this.onClickCross,
                                        onClickCheck: () => this.onClickCheck(recommendedUser) ,
                                     key :recommendedUser.userId
                                    }} 
                                    

                                    />
                                </CardForSwipe>
                            )
                        }
                    </Cards>
                    </div>
                } 
            </div >
        );
    };
};

export default withStyles(styles)(SwipeableCard);