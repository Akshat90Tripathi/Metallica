import React from 'react'
import { registerUser } from './RegisterAction'
import { UserDataUrl } from '../ConfigFiles/Config'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import { reduxForm, Field } from 'redux-form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import image from '../3326050-financial-wallpapers.jpg'

class Register extends React.Component {

submit(values) {
        this.props.Register(UserDataUrl.Url, values)
    }
render() {
        const { handleSubmit, error, touched } = this.props
        return (
            <div className="Register" style={{padding:'20px',backgroundImage:`url(${image})`,backgroundRepeat:'no-repeat',backgroundSize: "cover"}}>
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-1"></div>
                    <div style={{opacity:'0.9',backgroundColor:'white'  }}
                        className="col-md-6 col-sm-6 col-xs-10">
                        <div  align="center">
                            <strong><h2>Register</h2></strong>
                        </div>
                        <form onSubmit={handleSubmit(this.submit.bind(this))} >
                            <div className="row" >
                                <div className="col-md-12">
                                    <Field
                                        name="Name"
                                        component={renderField}
                                        label="Name"
                                        type="text"
                                    /> {touched && error && <span>{error}</span>}
                                </div>

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

                                <div className="col-md-12">
                                    <Field
                                        name="ConfirmPassword"
                                        component={renderField}
                                        label="Confirm Password"
                                        type="password"
                                    /> {touched && error && <span>{error}</span>}
                                </div>
                            </div>

                            <div className="row" style={{padding:'20px 0 0 15px'}}>
                                <button type="submit" className='btn btn-info' style={{fontSize:'20px'}} >Register</button>
                            </div>
                            <div className="row" align="center" style={{padding:'20px'}}>
                                <NavLink to='/' style={{ color: 'red' , fontWeight:'bold',fontSize:'18px'}}>Click here to Login</NavLink>
                            </div>
                        </form>
                       
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-1"></div>
              
            </div>
        )
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
    if (!values.Name) {
        errors.Name = 'Required'
    }
    if (!values.UserName) {
        errors.UserName = 'Required'
    }
    if (!values.Password) {
        errors.Password = 'Required'
    }
    
    if (values.Password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?_&.])[A-Z0-9$@$!%*?_&.]{8,}$/i.test(values.Password)) {
        errors.Password = 'Password must contain a number and a special char'
    }
    if (values.Password && values.Password.length<8) {
        errors.Password = 'Minimum of 8 length'
    }
    if (!values.ConfirmPassword) {
        errors.ConfirmPassword = 'Required'
    }
    if (values.ConfirmPassword && values.ConfirmPassword!==values.Password) {
        errors.ConfirmPassword = 'Password Mismatch'
    }
    return errors
}

const mapStateToProps = state => ({
    Register: state.RegisterReducer

})

const mapDispatchToProps = (dispatch) => {
    return {
        Register: (Url, UserDetails) => {
            dispatch(registerUser(Url, UserDetails))
        }
    }
}

Register = reduxForm({
    form: 'Login',
    validate,
})(Register)

export default connect(mapStateToProps, mapDispatchToProps)(Register);