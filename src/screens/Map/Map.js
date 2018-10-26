import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import firebase from '../../config/firebase'



class Map extends Component {

  constructor(props){
    super(props)

    

    this.state ={
     coords : null,
     userInfo:{}
    }

    this.updateCoords = this.updateCoords.bind(this);

    
}


componentDidMount() {
  this.setPosition()
  console.log('Map', this.props.history.location.state)        

  this.setState({
          userInfo : this.props.history.location.state || {} ,
         
  })
}

gotoDashboard(){
const { userInfo , coords } = this.state
    userInfo.userInfo.coords = coords ;
    console.log('userInfo coords',userInfo.userInfo.coords)

    this.setState({
      userInfo
    })
    console.log('userInfo',userInfo)
  let db = firebase.database()
      const userDetails = userInfo.userInfo
    db.ref(`Users/${userInfo.userInfo.userInfo.userId}`)
    .set({
      userDetails
    })

  this.props.history.replace('/dashboard')
}

setPosition(){

  navigator.geolocation.getCurrentPosition(position=>{
   
    this.setState({
     coords: position.coords 
   })

 })
}

updateCoords({latitude,longitude}){
  console.log("long",longitude)
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
             
             onClick={()=>{this.gotoDashboard()}}
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
