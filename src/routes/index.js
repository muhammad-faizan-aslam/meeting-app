import React from 'react';
import {  Route } from 'react-router-dom'
// import LoginFb from '../screens/Loginfb'
import FbLogin from '../screens/Loginfb'
import NameAndPhoneno from '../screens/UserForm/NameAndPhoneno'
import Images from '../screens/UserForm/Images'
import BeveragesAndTime from '../screens/UserForm/BeveragesAndTime'
import Location from '../screens/UserForm/Location'
import HeaderAppBar from '../Components/DashboardHeader/AppbarHeader'
// import Map   from '../screens/Map/Map'
import Dashboard from '../screens/Dashboard'
import Card from '../screens/RecommendedPeoples/RecommendedPeoples'




export default (props)=> {
    
    const {
        isUser,
        checkUserLogin,
        logOut,
        loginProcess,
        checkLoginProcess
        
    } = props.ScreenRoutes;

        console.log('routes props',props)
       return (

         <div>

       
                <Route render={(props)=> <HeaderAppBar {...props} AppBar={{ isUser, checkUserLogin , logOut ,loginProcess , checkLoginProcess }}  />} />
                {/* <Route  path='/' component={ LoginFb } exact /> */}
                 {/* <Route path='/fb' component={ FbLogin }  /> */}
                {/* <Route render={(props)=> < FbLogin  />} /> */}
                <Route  path='/NameAndPhoneno' component={ NameAndPhoneno }  />
                <Route  path='/Images' component={ Images }  />
                <Route  path='/BeveragesAndTime' component={ BeveragesAndTime }  />
                <Route  path='/Location' component={ Location }  />
                <Route  path='/dashboard' component={ Dashboard }  />
                <Route  path='/recommendedpeople' component={ Card }  />

             </div>
       )
        
}


