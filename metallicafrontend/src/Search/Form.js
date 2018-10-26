import React from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'

export const renderField = ({
    input,
    label,
    type,
    meta: { touched, error },
    ...custom
  }) => (
      <MuiThemeProvider>
        <TextField
          type={type}
          style={{width:'100%',margin:'0px 0px 0px 0px'}}
          errorText={touched && error}
          {...input}
          {...custom}
        />
      </MuiThemeProvider>
    )

export    const renderSelectField = ({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
      }) => (
        <MuiThemeProvider>
         <SelectField
         
             style={{width:'100%',margin:'0px 0px 0px 0px'}}
          hintText={label}
          errorText={touched && error}
          {...input}
          onChange={(event, index, value) => input.onChange(value)}
          children={children}
          {...custom}
        />
      </MuiThemeProvider>
 
      )

    export  const renderCheckbox = ({ input, label }) => (
      <MuiThemeProvider>        
        <Checkbox
          label={label}
          checked={input.value ? true : false}
          onCheck={input.onChange}
        />
      </MuiThemeProvider>
        
      )