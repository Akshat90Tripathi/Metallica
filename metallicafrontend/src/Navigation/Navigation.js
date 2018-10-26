import React from 'react';
import './NavigationStyling.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const Navigation = () => {
  return (
    <div className=" container-fluid" >
    <div className="navbar navbar-inverse mg0" hidden={false}>
      <nav className="navbar">
        <div className="container-fluid">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/nav/root">Metallica</Link>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className=" navbar-nav nav">
              <li ><Link to={'/nav/root'}>Trades</Link></li>
              <li ><Link to={'/nav/empty'}>Transfer</Link></li>
              <li ><Link to={'/nav/empty'}>Transport</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a ><span className="glyphicon glyphicon-user"></span>Hi {sessionStorage.getItem('UserName')}</a></li>
              <li><Link to={'/'}><span className="glyphicon glyphicon-log-out" onClick={()=>{sessionStorage.setItem('Allow',"false") ;toast.success("Logout Successful")}}></span> Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
     
      </div>
    </div>
    </div>
  )
}
export default Navigation;


