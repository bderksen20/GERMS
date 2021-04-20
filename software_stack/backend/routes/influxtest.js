var express = require('express');
var router = express.Router();
const Influx = require('influx');

// Connect to local influx DB
const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'example',
    port: 8086
});

// Router queries DB for all sensor measurments
router.get('/', function(req, res, next) {
    influx.query(
        [
            `select last(value) from IR`,
            `select last(value) from Light`,
            `select last(value) from P`,
            `select last(value) from Q`,
            `select last(value) from TVOC`,
            `select last(value) from eCO2`,
            `select last(value) from humid`,
            `select last(value) from pfstatus`,
            `select last(value) from precip_rate`,
            `select last(value) from press`,
            `select last(value) from temp`,
            `select last(value) from uvIndex`,
            `select last(value) from wind_angle`,
            `select last(value) from wind_direction`,
            `select last(value) from wind_speed`,
            'SELECT value FROM temp ORDER BY time DESC LIMIT 120',
            'SELECT value FROM Light ORDER BY time DESC LIMIT 120',
            'SELECT value FROM IR ORDER BY time DESC LIMIT 120',
            'SELECT value FROM press ORDER BY time DESC LIMIT 120',
            'SELECT value FROM humid ORDER BY time DESC LIMIT 120',
            'SELECT value FROM uvIndex ORDER BY time DESC LIMIT 120',
            'SELECT value FROM P ORDER BY time DESC LIMIT 120',
            'SELECT value FROM Q ORDER BY time DESC LIMIT 120',
            'SELECT value FROM TVOC ORDER BY time DESC LIMIT 120',
            'SELECT value FROM eCO2 ORDER BY time DESC LIMIT 120',
            'SELECT value FROM precip_rate ORDER BY time DESC LIMIT 120',
            'SELECT value FROM wind_speed ORDER BY time DESC LIMIT 120',
            'SELECT value FROM wind_direction ORDER BY time DESC LIMIT 120'
        ])
        .catch(err=>{
        console.log(err);
        })
        .then(results=>{
        res.json(results);
    });
});

module.exports=router;
//module.exports=influx;