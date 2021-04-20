import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css'
import { Button } from '../Button'
import { Link } from "react-router-dom";

// Using class over function bc state fxn
class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(

        <nav className="NavbarItems">
            
            <img className="navbar-logo" src={'images/ssoe.png'} />
            <strong className="navbar-title">Senior Design - Green Energy and Sensor System</strong>
            <ul className="nav-menu ml-auto">
                <li className="nav-links"><Link to="/">Home</Link></li>
                <li className="nav-links"><Link to="/group">About</Link></li>
                <li className="nav-links"><Button className="btn">Request Access</Button></li>
            </ul>

        </nav>
        )
    }
}

export default Navbar

/*
<ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            < li key={index} >
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul> */