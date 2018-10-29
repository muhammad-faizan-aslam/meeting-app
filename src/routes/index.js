import React from 'react';
import { Switch , Route } from 'react-router-dom'
// import LoginFb from '../screens/Loginfb'
import FbLogin from '../screens/Loginfb'
import NameAndPhoneno from '../screens/UserForm/NameAndPhoneno'
import Images from '../screens/UserForm/Images'
import BeveragesAndTime from '../screens/UserForm/BeveragesAndTime'
import Location from '../screens/UserForm/Location'
// import Map   from '../screens/Map/Map'
import Dashboard from '../screens/Dashboard'
import Card from '../screens/RecommendedPeople/Card'




export default ()=> {

       return (

            <Switch>

                {/* <Route  path='/' component={ LoginFb } exact /> */}
                 <Route  path='/' component={ FbLogin } exact />
                <Route  path='/NameAndPhoneno' component={ NameAndPhoneno }  />
                <Route  path='/Images' component={ Images }  />
                <Route  path='/BeveragesAndTime' component={ BeveragesAndTime }  />
                <Route  path='/Location' component={ Location }  />
                <Route  path='/dashboard' component={ Dashboard }  />
                <Route  path='/recommendedpeople' component={ Card }  />

            </Switch>
       )
        
}


