const Influx = require('influx');
const express = require('express')
const http = require('http')
const os = require('os')

const app = express()

// Describe influxdb to connect to
const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'example',
    port: 8086
});

// If database does not exist, create. Otherwise, boot up!
influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('example')) {
      console.log("Specified database does not exist!!!")
      //return influx.createDatabase('example');
    }
  })
  .then(() => {
    http.createServer(app).listen(3001, function () {
      console.log('Listening on port 3001')
    })
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
})

/*
influx.query(
    `select last(value) from some_sensor`
    )
    .catch(err=>{
    console.log(err);
    })
    .then(results=>{
    res.json(results);
});
*/

//module.exports=influx;