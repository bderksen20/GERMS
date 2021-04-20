import { render } from '@testing-library/react'
import React, {Component} from 'react'
//import './Table.css'
import Table from 'react-bootstrap/Table'

// Using class over function bc state fxn
//export const TableContainer = () => {
class TableContainer extends Component {

  state = {tb_influx_data: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]}

  componentDidMount() {
    fetch('/influx')
    .then(res => res.json())
    .then(tb_influx_data => this.setState({tb_influx_data}));
  }

  render() {
    return(
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sensor</th>
          <th>Metric</th>
          <th>Units</th>
          <th>Reading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>SI1145</td>
          <td>UV Index</td>
          <td>UV index</td>
          <td>{this.state.tb_influx_data[11].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>SI1145</td>
          <td>Infrared (IR)</td>
          <td>ADC counts</td>
          <td>{this.state.tb_influx_data[0].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>SI1145</td>
          <td>Visible Light</td>
          <td>W/m^2</td>
          <td>{this.state.tb_influx_data[1].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>BME280</td>
          <td>Temperature</td>
          <td>degrees F</td>
          <td>{this.state.tb_influx_data[10].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>BME280</td>
          <td>Humidity</td>
          <td>%</td>
          <td>{this.state.tb_influx_data[6].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>BME280</td>
          <td>Pressure</td>
          <td>hPa</td>
          <td>{this.state.tb_influx_data[9].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>SGP30</td>
          <td>Air Quality: VOC</td>
          <td>ppb</td>
          <td>{this.state.tb_influx_data[4].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>SGP30</td>
          <td>Air Quality: eCO2</td>
          <td>ppm</td>
          <td>{this.state.tb_influx_data[5].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>Wind Vane</td>
          <td>Wind Angle</td>
          <td>degrees</td>
          <td>{this.state.tb_influx_data[12].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>Wind Vane</td>
          <td>Wind Direction</td>
          <td>-</td>
          <td>{this.state.tb_influx_data[13].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>Wind Vane</td>
          <td>Wind Speed</td>
          <td>kph</td>
          <td>{this.state.tb_influx_data[14].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>Transformers</td>
          <td>Power (P)</td>
          <td>W</td>
          <td>{this.state.tb_influx_data[2].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
        <tr>
          <td>Transformers</td>
          <td>Reactive Power (Q)</td>
          <td>VAR</td>
          <td>{this.state.tb_influx_data[3].map(point => <div key={point.time}>{point.last}</div>)}</td>
        </tr>
      </tbody>
    </Table>
   );
  }

} 

export default TableContainer;