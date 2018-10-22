import React from 'react';
import { Switch , Route } from 'react-router-dom'
import LoginFb from '../screens/Loginfb'
import Form1 from '../screens/UserForm/Form1'
import Form2 from '../screens/UserForm/Form2'
import Form3 from '../screens/UserForm/Form3'
import Map   from '../screens/Map/Map'
import Dashboard from '../screens/Dashboard'




export default ()=> {

       return (

            <Switch>
                
                <Route  path='/' component={ LoginFb } exact />
                <Route  path='/form1' component={ Form1 }  />
                <Route  path='/form2' component={ Form2 }  />
                <Route  path='/form3' component={ Form3 }  />
                <Route  path='/map' component={ Map }  />
                <Route  path='/dashboard' component={ Dashboard }  />

            </Switch>
       )
        
}


