//import logo from './logo.svg';
import React, {Component, useState} from 'react';
import './App.css';
import TableContainer from './components/TableContainer';
import Navbar from './components/Navbar/Navbar';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { WindRose } from "react-windrose-chart"
import axios from 'axios'

class App extends Component {
  //state = {users: []}
  state = {influx_data: [[], [{time: "na", last: 0}], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [{time: "na", value: 0}], [{time: "na", value: 0}], 
                                [{time: "na", value: 0}], [{time: "na", value: 0}], [{time: "na", value: 0}]],
          plot1_data: "temp", plot1_npts: 5,
          plot2_data: "Light", plot2_npts: 5,
          plot3_data: "IR", plot3_npts: 5, wind_pts: 20,
          windrose_data: [
            {
              name: "North",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "NNE",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "NE",
              "0-1": 0, '1-2': 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "ENE",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "East",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "ESE",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "SE",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "SSE",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "South",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "SSW",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "SW",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "WSW",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "West",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "WNW",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "NW",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            },
            {
              name: "NNW",
              "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
              "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
              total: 0
            }]
          }

  // Maps for metrics (as they are in database) to text name and index of pulled data
  metric_data_map = {temp: 15, IR: 17, Light: 16, press: 18, humid: 19, uvIndex: 20, P: 21, Q: 22, TVOC: 23, eCO2: 24, precip_rate: 25, wind_speed: 26, wind_direction: 27};
  metric_name_map = {temp: "Temperature", IR: "Infrared", Light: "Visible Light", humid: "Humidity", press: "Pressure", uvIndex: "UV Index", 
                      P: "Power", Q: "Reactive Power", TVOC: "TVOC", eCO2: "eCO2", precip_rate: "Precipitation Rate"}

  windrose_dir = {North: 0, NE: 0, East: 0, SE: 0, South: 0, SW: 0, West: 0, NW: 0}
  windrose_dir_index_map = {North: 0, NNE: 1, NE: 2, ENE: 3, East: 4, ESE: 5, SE: 6, SSE: 7, South: 8, SSW: 9, SW: 10, WSW: 11 ,West: 12, WNW: 13, NW: 14, NNW: 15}
  // Dummy data for wind rose component
  

  componentDidMount() {
    fetch('/influx')
    .then(res => res.json())
    .then(influx_data => this.setState({influx_data}));
  }

  calc_windroseinfo = event =>{

      // SPREAD VARIABLE: makes a copy of the state data, edit and then replace state with this variable
      //var windrose_data1 = [...this.state.windrose_data];
      var windrose_data1 = [
        {
          name: "North",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "NNE",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "NE",
          "0-1": 0, '1-2': 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "ENE",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "East",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "ESE",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "SE",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "SSE",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "South",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "SSW",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "SW",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "WSW",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "West",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "WNW",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "NW",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        },
        {
          name: "NNW",
          "0-1": 0, "1-2": 0, "2-3": 0, "3-4": 0,
          "4-5": 0, "5-6": 0, "6-7": 0, "7+": 0,
          total: 0
        }]

      var increment = 1.0 / this.state.wind_pts;

      // Iterate through wind direction [27] and wind speed [26] data
      for(var count = 0; count < this.state.wind_pts; count++){
        if(this.state.influx_data[26][count].value < 1){
          windrose_data1[this.windrose_dir_index_map[this.state.influx_data[27][count].value]]['0-1'] += increment;
        }
        else if(this.state.influx_data[26][count].value < 2){
          windrose_data1[this.windrose_dir_index_map[this.state.influx_data[27][count].value]]['1-2'] += increment;
        }
        else if(this.state.influx_data[26][count].value < 3){
          windrose_data1[this.windrose_dir_index_map[this.state.influx_data[27][count].value]]['2-3'] += increment;
        }
        else if(this.state.influx_data[26][count].value < 4){
          windrose_data1[this.windrose_dir_index_map[this.state.influx_data[27][count].value]]['3-4'] += increment;
        }
        else if(this.state.influx_data[26][count].value < 5){
          windrose_data1[this.windrose_dir_index_map[this.state.influx_data[27][count].value]]['4-5'] += increment;
        }
        else if(this.state.influx_data[26][count].value < 6){
          windrose_data1[this.windrose_dir_index_map[this.state.influx_data[27][count].value]]['5-6'] += increment;
        }
        else if(this.state.influx_data[26][count].value < 7){
          windrose_data1[this.windrose_dir_index_map[this.state.influx_data[27][count].value]]['6-7'] += increment;
        }
        else{
          windrose_data1[this.windrose_dir_index_map[this.state.influx_data[27][count].value]]['7+'] += increment;
        }
      }

      //windrose_data1[0]['0-1'] = 1;
      this.setState({windrose_data: windrose_data1});
      //this.forceUpdate();
  }

  plot1_UpdateMetric = event => {
    this.setState({plot1_data: event.target.id})
  }

  plot1_UpdatePts = event => {
    this.setState({plot1_npts: event.target.id})
  }

  plot2_UpdateMetric = event => {
    this.setState({plot2_data: event.target.id})
  }

  plot2_UpdatePts = event => {
    this.setState({plot2_npts: event.target.id})
  }

  plot3_UpdateMetric = event => {
    this.setState({plot3_data: event.target.id})
  }

  plot3_UpdatePts = event => {
    this.setState({plot3_npts: event.target.id})
  }

  windplot_UpdatePts = event => {
    //this.calc_windroseinfo();
    this.setState({wind_pts: event.target.id});
    //this.calc_windroseinfo();
    
  }

//Test: {this.state.windrose_data[4].angle} <Button variant="primary" onClick={this.calc_windroseinfo}>Test</Button>
//Test2: {this.state.test}
//<WindRose ref="windrose" data={this.state.windrose_data} columns={this.state.windrose_cols} width={this.state.test} />

  render() {
    return (
      <div className="App">
          <Navbar />
          <div className="app-grid">
            <div className="statuspane">
              <p></p>
              <b>System Status</b>
              <p></p>
              <div>
                <p>Metrics last updated: <b className = "timeupdtext">{this.state.influx_data[1][0].time}</b></p>
              </div>
              <div>
              
              </div>
            </div>
            <div className="tablepane">
            <TableContainer></TableContainer>
            </div>
            <div className="infopane">
              <p></p>
              <b>Wind Data Plot</b>
              <p></p>
              <div className = "wplot-ctrl">
                <p className="wplot-label">Wind Frequency (Dir+Spd)</p>
                <Button className="wplot-ctrl-item" variant="primary" onClick={this.calc_windroseinfo}>Update</Button>
                <DropdownButton className="wplot-ctrl-item" id="dropdown-basic-button" title="N pts" >
                  <Dropdown.Item id="5" onClick={this.windplot_UpdatePts}>5</Dropdown.Item>
                  <Dropdown.Item id="10" onClick={this.windplot_UpdatePts}>10</Dropdown.Item>
                  <Dropdown.Item id="20" onClick={this.windplot_UpdatePts}>20</Dropdown.Item>
                  <Dropdown.Item id="60" onClick={this.windplot_UpdatePts}>60</Dropdown.Item>
                  <Dropdown.Item id="120" onClick={this.windplot_UpdatePts}>120</Dropdown.Item>
                </DropdownButton>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  width={500}
                  height={400}
                  data={this.state.windrose_data}
                  margin={{
                    top:10,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="top" align="right"/>
                  <Bar dataKey="0-1" stackId="a" fill="#783A9D" />
                  <Bar dataKey="1-2" stackId="a" fill="#0055ff" />
                  <Bar dataKey="2-3" stackId="a" fill="#44ADE7" />
                  <Bar dataKey="3-4" stackId="a" fill="#44E7E3" />
                  <Bar dataKey="4-5" stackId="a" fill="#3FDF43" />
                  <Bar dataKey="5-6" stackId="a" fill="#CBE041" />
                  <Bar dataKey="6-7" stackId="a" fill="#F6F50C" />
                  <Bar dataKey="7+" stackId="a" fill="#F6AC0F" />
                </BarChart>
              </ResponsiveContainer>
              
            </div>
            <div className="plotpane">
              <p></p>
              <div><b>Data Plots</b></div>
              <p></p>
              
              <div className = "plot-container">
                <div className = "plot-item">
                  <div className = "plot-ctrl">
                    <p className="plot-label">{this.metric_name_map[this.state.plot1_data]} vs. Time</p>
                    <DropdownButton className="plot-ctrl-item" id="dropdown-basic-button" title="Display Data" >
                      <Dropdown.Item id="temp" onClick={this.plot1_UpdateMetric}>Temperature</Dropdown.Item>
                      <Dropdown.Item  id="Light" onClick={this.plot1_UpdateMetric}>Light</Dropdown.Item>
                      <Dropdown.Item  id="IR" onClick={this.plot1_UpdateMetric}>Infrared</Dropdown.Item>
                      <Dropdown.Item  id="press" onClick={this.plot1_UpdateMetric}>Pressure</Dropdown.Item>
                      <Dropdown.Item  id="humid" onClick={this.plot1_UpdateMetric}>Humidity</Dropdown.Item>
                      <Dropdown.Item  id="uvIndex" onClick={this.plot1_UpdateMetric}>UV Index</Dropdown.Item>
                      <Dropdown.Item  id="P" onClick={this.plot1_UpdateMetric}>Power</Dropdown.Item>
                      <Dropdown.Item  id="Q" onClick={this.plot1_UpdateMetric}>Reactive Power</Dropdown.Item>
                      <Dropdown.Item  id="TVOC" onClick={this.plot1_UpdateMetric}>TVOC</Dropdown.Item>
                      <Dropdown.Item  id="eCO2" onClick={this.plot1_UpdateMetric}>eCO2</Dropdown.Item>
                      <Dropdown.Item  id="precip_rate" onClick={this.plot1_UpdateMetric}>Precipitation Rate</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="plot-ctrl-item" id="dropdown-basic-button" title="N pts" >
                      <Dropdown.Item  id="5" onClick={this.plot1_UpdatePts}>5</Dropdown.Item>
                      <Dropdown.Item  id="10" onClick={this.plot1_UpdatePts}>10</Dropdown.Item>
                      <Dropdown.Item  id="20" onClick={this.plot1_UpdatePts}>20</Dropdown.Item>
                      <Dropdown.Item  id="60" onClick={this.plot1_UpdatePts}>60</Dropdown.Item>
                      <Dropdown.Item  id="120" onClick={this.plot1_UpdatePts}>120</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <LineChart width={450} height={300} data={this.state.influx_data[this.metric_data_map[this.state.plot1_data]].slice(0, this.state.plot1_npts)} >
                    <XAxis dataKey="time" reversed="true"></XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </div>

                <div className="plot-item">
                  <div className = "plot-ctrl">
                    <p className="plot-label">{this.metric_name_map[this.state.plot2_data]} vs. Time</p>
                    <DropdownButton className="plot-ctrl-item" id="dropdown-basic-button" title="Display Data" >
                    <Dropdown.Item  id="temp" onClick={this.plot2_UpdateMetric}>Temperature</Dropdown.Item>
                      <Dropdown.Item  id="Light" onClick={this.plot2_UpdateMetric}>Light</Dropdown.Item>
                      <Dropdown.Item  id="IR" onClick={this.plot2_UpdateMetric}>Infrared</Dropdown.Item>
                      <Dropdown.Item  id="press" onClick={this.plot2_UpdateMetric}>Pressure</Dropdown.Item>
                      <Dropdown.Item  id="humid" onClick={this.plot2_UpdateMetric}>Humidity</Dropdown.Item>
                      <Dropdown.Item  id="uvIndex" onClick={this.plot2_UpdateMetric}>UV Index</Dropdown.Item>
                      <Dropdown.Item  id="P" onClick={this.plot2_UpdateMetric}>Power</Dropdown.Item>
                      <Dropdown.Item  id="Q" onClick={this.plot2_UpdateMetric}>Reactive Power</Dropdown.Item>
                      <Dropdown.Item  id="TVOC" onClick={this.plot2_UpdateMetric}>TVOC</Dropdown.Item>
                      <Dropdown.Item  id="eCO2" onClick={this.plot2_UpdateMetric}>eCO2</Dropdown.Item>
                      <Dropdown.Item  id="precip_rate" onClick={this.plot2_UpdateMetric}>Precipitation Rate</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="plot-ctrl-item" id="dropdown-basic-button" title="N pts" >
                      <Dropdown.Item  id="5" onClick={this.plot2_UpdatePts}>5</Dropdown.Item>
                      <Dropdown.Item  id="10" onClick={this.plot2_UpdatePts}>10</Dropdown.Item>
                      <Dropdown.Item  id="20" onClick={this.plot2_UpdatePts}>20</Dropdown.Item>
                      <Dropdown.Item  id="60" onClick={this.plot2_UpdatePts}>60</Dropdown.Item>
                      <Dropdown.Item  id="120" onClick={this.plot2_UpdatePts}>120</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <LineChart className="plot-item" width={450} height={300} data={this.state.influx_data[this.metric_data_map[this.state.plot2_data]].slice(0, this.state.plot2_npts)}>
                    <XAxis dataKey="time" reversed="true"></XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </div>
              
              <div className="plot-item">
                <div className = "plot-ctrl">
                    <p className="plot-label">{this.metric_name_map[this.state.plot3_data]} vs. Time</p>
                    <DropdownButton className="plot-ctrl-item" id="dropdown-basic-button" title="Display Data" >
                      <Dropdown.Item  id="temp" onClick={this.plot3_UpdateMetric}>Temperature</Dropdown.Item>
                      <Dropdown.Item  id="Light" onClick={this.plot3_UpdateMetric}>Light</Dropdown.Item>
                      <Dropdown.Item  id="IR" onClick={this.plot3_UpdateMetric}>Infrared</Dropdown.Item>
                      <Dropdown.Item  id="press" onClick={this.plot3_UpdateMetric}>Pressure</Dropdown.Item>
                      <Dropdown.Item  id="humid" onClick={this.plot3_UpdateMetric}>Humidity</Dropdown.Item>
                      <Dropdown.Item  id="uvIndex" onClick={this.plot3_UpdateMetric}>UV Index</Dropdown.Item>
                      <Dropdown.Item  id="P" onClick={this.plot3_UpdateMetric}>Power</Dropdown.Item>
                      <Dropdown.Item  id="Q" onClick={this.plot3_UpdateMetric}>Reactive Power</Dropdown.Item>
                      <Dropdown.Item  id="TVOC" onClick={this.plot3_UpdateMetric}>TVOC</Dropdown.Item>
                      <Dropdown.Item  id="eCO2" onClick={this.plot3_UpdateMetric}>eCO2</Dropdown.Item>
                      <Dropdown.Item  id="precip_rate" onClick={this.plot3_UpdateMetric}>Precipitation Rate</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="plot-ctrl-item" id="dropdown-basic-button" title="N pts" >
                      <Dropdown.Item  id="5" onClick={this.plot3_UpdatePts}>5</Dropdown.Item>
                      <Dropdown.Item  id="10" onClick={this.plot3_UpdatePts}>10</Dropdown.Item>
                      <Dropdown.Item  id="20" onClick={this.plot3_UpdatePts}>20</Dropdown.Item>
                      <Dropdown.Item  id="60" onClick={this.plot3_UpdatePts}>60</Dropdown.Item>
                      <Dropdown.Item  id="120" onClick={this.plot3_UpdatePts}>120</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <LineChart className="plot-item" width={450} height={300} data={this.state.influx_data[this.metric_data_map[this.state.plot3_data]].slice(0, this.state.plot3_npts)}>
                    <XAxis dataKey="time" reversed="true"></XAxis>
                    <YAxis dataKey="value"></YAxis>
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
              </div>
              
              </div>
            </div>
            <div className="footerpane">
              <b></b>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
