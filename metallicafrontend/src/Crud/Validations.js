const validate = values => {

    const errors = {}
    if (!values.Price) {
      errors.Price = 'Required'
    }else if(isNaN(Number(values.Price))){
        errors.Price= 'Not a number' 
    }
    if (!values.password) {
      errors.password = 'Required'
    }
    if (!values.CommodityId) {
        errors.CommodityId = 'Required'
      }
    return errors
  }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
return sleep(1000).then(() => {
// simulate server latency
if (['john', 'paul', 'george', 'ringo'].includes(values.rice)) {
throw { username: 'That username is taken' }
} 
})
}
  