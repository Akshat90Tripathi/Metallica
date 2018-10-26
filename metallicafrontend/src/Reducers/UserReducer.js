const initialstate={
    name : "Add Stock",
    visible  : true,
    disable  : true,
    Data     : [],
    disableFields : false,
    Operation : '',
} 

 const  UserReducer=(state=initialstate , action)=>{

switch(action.type){
    case 'Toggle_Component' :
                    return{
                        name    : action.heading,
                        visible : action.visible,
                        disable : action.disable,
                        Data    : action.Data ,
                        disableFields : action.disableFields,
                        Operation : action.Operation
                    }
     default : 
     return state;               
}

}

export default UserReducer;