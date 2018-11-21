import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import firebase from '../../config/firebase'
import swal from 'sweetalert2'



class Map extends Component {

  constructor(props){
    super(props)
    
    this.state = {
                   coords : null
                 }

    this.updateCoords = this.updateCoords.bind(this);

    
}


componentDidMount() {
  const user = firebase.auth().currentUser;
  if(user){

    this.setPosition()
  }
  else{
      
      this.props.history.push('/',{})
  }
 
}

gotoDashboard(e){
          e.preventDefault()
          const { coords } = this.state ;
          const { state }= this.props.history.location ;

          // console.log('MAP  LOCATION  =========>',state)
          // console.log('MAP  LOCATION COORDs =========>',coords)

          const UID = firebase.auth().currentUser.uid ;

          // console.log('MAP  LOCATION UID =========>',UID)

          let db = firebase.database()
            
            db.ref(`Users/${UID}`)
            .set({
                  ...state,...coords,isMeeting:false,notification:[]
            })

            db.ref(`Users/${UID}`)
               .once('value',snapshot=>{

                if(snapshot.val()){
                                    this.props.history.replace('/dashboard',snapshot.val())
                                  }
                else{
                  swal('USER DELETED')
                    }
      
    })
 


  }
setPosition(){
 
  navigator.geolocation.getCurrentPosition(position=>{
 
    this.setState({
              coords: {
                          latitude: position.coords.latitude,
                          longitude: position.coords.longitude
                        }
                 })

          })
          }

updateCoords({latitude,longitude}){
  // console.log("long",longitude)
            this.setState({
                   coords : {latitude,longitude}
            })

                                }

  render() {
    
    const { coords  } = this.state;
   
    return (
      
      <div className="App">

           { coords && <MyMapComponent

            coords={coords}
            updateCoords={this.updateCoords}

            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />}

          <div>
              
              <button type="button"
              onClick={()=>{this.gotoDashboard(e)}}
              class="btn btn-large btn-block btn-success">NEXT</button>
              
          </div>
      </div>
        

    );
  
  
  }
  

  
}
  

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    // defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker
     position={{ lat: props.coords.latitude, lng: props.coords.longitude }} 
     draggable={true}
      
     onDragEnd={ position => {
          console.log("run",position.latLng.lat())
          props.updateCoords({latitude: position.latLng.lat(), longitude: position.latLng.lng()})
      }}
     
     />}
     
  </GoogleMap>
))


export default Map ;
