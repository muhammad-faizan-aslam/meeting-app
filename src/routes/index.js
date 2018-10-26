import React from 'react';
import { Switch , Route } from 'react-router-dom'
// import LoginFb from '../screens/Loginfb'
import FbLogin from '../screens/Loginfb/FbLogin'
import Form1 from '../screens/UserForm/FormOne'
import Form2 from '../screens/UserForm/FormTwo'
import Form3 from '../screens/UserForm/Form3'
import Map   from '../screens/Map/Map'
import Dashboard from '../screens/Dashboard'
import Card from '../screens/RecommendedPeople/Card'




export default ()=> {

       return (

            <Switch>

                {/* <Route  path='/' component={ LoginFb } exact /> */}
                 <Route  path='/' component={ FbLogin } exact />
                <Route  path='/form1' component={ Form1 }  />
                <Route  path='/form2' component={ Form2 }  />
                <Route  path='/form3' component={ Form3 }  />
                <Route  path='/map' component={ Map }  />
                <Route  path='/dashboard' component={ Dashboard }  />
                <Route  path='/recommendedpeople' component={ Card }  />

            </Switch>
       )
        
}


