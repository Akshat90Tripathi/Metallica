import React from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField'
import { RadioButtonGroup } from 'material-ui/RadioButton'
export const renderField = ({
    input,
    label,
    type,
    meta: 
    { touched, error },
    ...custom
  }) => (
      <MuiThemeProvider>
          <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-9 col-xs-10'>
        <TextField
            
            style={{fontSize:'15px' ,fontWeight:'bold',width:'100%'}}            
             floatingLabelText={label}         
          hintText={label}
          type={type}
          errorText={touched && error}
          {...input}
          {...custom}
        />
        </div>
        <div className='col-md-2'></div>        
        </div>
      </MuiThemeProvider>
    )

export    const renderSelect = ({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
      }) => (
        <MuiThemeProvider>
            <div className='row' >
          <div className='col-md-1'>
          </div>
          <div className='col-md-9 col-xs-10'>
         <SelectField
             style={{width:'100%',fontSize:'15px' ,fontWeight:'bold'}}
          floatingLabelText={label}
             hintText={label}
          errorText={touched && error}
          {...input}
          onChange={(event, index, value) => input.onChange(value)}
          children={children}
          {...custom}
        />
        </div>
        <div className='col-md-2'></div>
        </div>
      </MuiThemeProvider>
 
      )

 export const renderRadioGroup = ({ input,label, ...rest }) => (
        <MuiThemeProvider>
   
        <RadioButtonGroup
          {...input}
          {...rest}
          valueSelected={input.value}
          onChange={(event, value) => input.onChange(value)}
   />
       </MuiThemeProvider>
      )
      
