import React from 'react'
import Store from './Store/Store'
import { Provider } from 'react-redux'
import Search from './Search/Search'
import Widget from './Widget/Widget'
import GridComponent from './GridComponent/GridComponent'
import Crud from './Crud/Crud'

class Root extends React.Component {
  
  render() {

    return (
      <div className="container-fluid">
        <div className="animate fadeInDown one mt-10">
          <Provider store={Store}>
            <Widget />
          </Provider>
        </div>

        <div className="row1" className="animate fadeInRight one mt-10">
          <Provider store={Store}>
            <Search />
          </Provider>
        </div>
        <div className="row animate fadeInUpBig one mt-10">
         
            <Provider store={Store}>
              <GridComponent />
            </Provider>
         
          <div className="col-md-4" style={{padding:'0px 15px 0px 0px'}} >
            <Provider store={Store}>
              <Crud onSubmit={this.onSubmitt} />
            </Provider>
          </div>
        </div>
      </div>
    );
  }

}

export default Root;