import React, {Component, useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import './GroupPage.css';

class GroupPage extends Component{
    render() {
      return (
        <div className="GroupPage">
            <Navbar />
            <div className="gp-grid">
                <div className="aboutpane">
                    <p></p>
                    <b>Project Description</b>
                </div>
                <div className="gmpane">
                    <div  className="nametag"><p><b>Daniel Morton</b></p></div>
                    <p></p>
                    <div class="img-cropper">
                        <img src={'images/dan_m.png'} className = "cropped-img2" />
                    </div>
                </div>
                <div className="gmpane">
                    <div  className="nametag"><b>Anthony Popovski</b></div>
                </div>
                <div className="gmpane">
                    <div className="nametag"><p><b>Evan Gzesh</b></p></div>
                    <p></p>
                    <div class="img-cropper">
                        <img src={'images/evan_g.png'} className = "cropped-img2" />
                    </div>
                </div>
                <div className="gmpane">
                    <div className="nametag"> <p><b>Bill Derksen</b></p> </div>
                    <p></p>
                    <div class="img-cropper">
                        <img src={'images/bill_d.jpg'} className = "cropped-img" />
                    </div>


                </div>
            </div>
        </div>
      );
  }
}
  
export default GroupPage;