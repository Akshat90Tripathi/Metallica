import React from 'react'
import { UserDataUrl } from '../ConfigFiles/Config'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { VerifyUser } from './LoginAction';
import { NavLink } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import { reduxForm, Field } from 'redux-form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { GoogleLogin } from 'react-google-login';

import image from '../3326050-financial-wallpapers.jpg'
class Login extends React.Component {
  constructor() {
    super()
    sessionStorage.setItem('Allow' ,'false')
    this.state = {
      redirect: false
    }
  }

  submit(values) {
    this.props.verify(UserDataUrl.verifyUserUrl.url, values)
  }


  render() {

    if (sessionStorage.getItem('Allow')==='true')
      return <Redirect to='/nav/root' />

    const { handleSubmit, error, touched } = this.props
    return (
      <div className="login" style={{ padding: '20px ',backgroundImage:`url(${image})`,backgroundRepeat:'no-repeat',backgroundSize: "cover",}}>
        <div className="row" >
          <div className="col-lg-4 col-md-3 col-sm-3 col-xs-1"></div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-10" style={{marginTop: '5%',opacity:'0.9',backgroundColor:'white' }}> 
            <div align="center" >
              <strong><h2>Login</h2></strong>
            </div>
            <form onSubmit={handleSubmit(this.submit.bind(this))}>
              <div className="row" >
                <div className="col-md-12">
                  <Field
                    name="UserName"
                    component={renderField}
                    label="UserName"
                    type="text"
                  /> {touched && error && <span>{error}</span>}
                </div>

                <div className="col-md-12">
                  <Field
                    name="Password"
                    component={renderField}
                    label="Password"
                    type="password"
                  /> {touched && error && <span>{error}</span>}
                </div>
              </div>
              <div className="row">
              </div>
              <div className="row" style={{ padding: '20px 0 0 15px' }} >
                <button type="submit" className='btn btn-info' style={{ fontSize: '20px',opacity:'1' }}>submit</button>
              </div>

              <div className="row" align="center" style={{ marginTop: "20%" }}>
                <span style={{ fontWeight: 'bold', color: 'blue',opacity:'1' }}> New User?</span> <NavLink to='/register' style={{ color: 'red' }}>Register here</NavLink>
              </div>
            </form>
{/*            

  <GoogleLogin
    clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  >
    <span> Login with Google</span>
  </GoogleLogin> */}

          </div>
        </div>
        <div className="col-lg-4 col-md-3 col-sm-3 col-xs-1"></div></div>

    )
  }
}

const responseGoogle = (response) => {
  console.log(response);
}

const mapStateToProps = state => ({
  Login: state.LoginReducer

})

const mapDispatchToProps = (dispatch) => {
  return {
    verify: (data, data1) => {
      dispatch(VerifyUser(data, data1))
    }


  }
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
  ...custom
}) => (
    <MuiThemeProvider>
      <TextField
        type={type}
        style={{ width: '100%' }}
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    </MuiThemeProvider>
  )
const validate = values => {
  const errors = {}
  if (!values.Password) {
    errors.Password = 'Required'
  }
  if (!values.UserName) {
    errors.UserName = 'Required'
  }
  return errors
}

Login = reduxForm({
  form: 'Login',
  validate,
})(Login)

export default connect(mapStateToProps, mapDispatchToProps)(Login);

