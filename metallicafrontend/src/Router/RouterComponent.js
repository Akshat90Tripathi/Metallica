import { BrowserRouter as Router, Route, Switch, Redirect, Prompt } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import Root from "../Root"
import React from 'react'
import Empty from '../Empty/Empty'
import Register from '../Register/Register'
import Login from '../Login/Login';
import { Provider } from 'react-redux'
import Store from '../Store/Store'
import {connect} from 'react-redux'

class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Prompt
                        when={true}
                        message={(location) => {
                            return location.pathname.startsWith("/nav/empty") ? "Not working Now... still want to continue ??" : true
                        }}
                    />
                    
                    <Route   path='/nav' render={() => (sessionStorage.getItem('Allow')==='true' ?(<Navigation />):(<Redirect to="/" />))} />
                    <Switch>
                    <Route   path='/nav/empty' component={Empty} />
                    <Route   path='/nav/root' component={Root} />
                    </Switch>                     
                    <Route  exact path='/register' render={()=>(<Provider store={Store}><Register/></Provider> )}  />
                    <Route exact path='/' render={()=>(<Provider store={Store}><Login/></Provider> )} />
                </div>
            </Router>

        )
    }
}

const mapStateToProps = state => ({
    Login : state.LoginReducer
  
  })
export default  connect(mapStateToProps)(RouterComponent);