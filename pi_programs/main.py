import threading, signal, time
import anemo, precip, phase, power, bme280, sgp30, si1145, ads1015_mod #import all modules
from influxdb import InfluxDBClient
import datetime

# This function runs every minute
def every_minute():
    # Sets timer to run code again in 60 seconds
    threading.Timer(60, every_minute).start()
    
    # Record date and time
    timestamp = datetime.datetime.now()
    print(timestamp)

    # Record light data from si1145 sensor
    [vis, IR, uvIndex] = si1145.si()
    
    print("Visible light: %d lx" % vis)
    print("IR light: %d lx" % IR)
    print("UV index: %.2f" % uvIndex)
    
    # Record temperature, humidity, & pressure from bme280 sensor
    [temp, humid, press] = bme280.bme()
    
    print("Temperature: %.2f deg F" % temp)
    print("Humidity: %.2f %%" % humid)
    print("Pressure: %.2f hPa" % press)
    
    # Record eCO2 and TVOC from sgp30 sensor
    [eCO2, TVOC] = sgp30.sgp()
    
    print("CO2eq: %.2f ppm" % eCO2)
    print("TVOC: %.2f ppb" % TVOC)
    
    # Record raw ADC voltage values to determine unscaled RMS values. These functions run for 5 seconds each by default
    Vrms_unscaled = ads1015_mod.vrms()
    Irms_unscaled = ads1015_mod.irms()
    
    # Record phase angle and frequency values. This function runs for 5 seconds by default
    [theta, freq] = phase.phase()
    
    # Calculate real power, reactive power, power factor, and power factor lead/lag status
    [P, Q, S, pf, pfstatus] = power.power(Vrms_unscaled, Irms_unscaled, freq, theta)
    
    theta_d = theta*180/3.1415927
    print("P: %.2f W" % P)
    print("Q: %.2f VAr" % Q)
    print("S: %.2f VA" % S)
    print("Power Factor is %f %s" % (pf, pfstatus))
    print("Theta: %f deg" % theta_d)
    print("Freq: %f Hz" % freq)
    
    # Record wind speed. This function runs for 20 seconds by default
    #anemo.t_run = 2 #uncomment to speed up testing
    wind_speed = anemo.anemo()
    [wind_direction, wind_angle] = ads1015_mod.getdirection()
    
    print("Wind speed: %f" % wind_speed)
    print("Wind direction: %s" % wind_direction)
    
    # Record precipation rate. This function runs for 20 seconds by default
    #precip.t_run = 2 #uncomment to speed up testing
    precip_rate = precip.precip()
    
    print("Precip rate: %f\n" % precip_rate)
    
    
    # Send data to database
    global client
    
    # Influx
    json_body = [
        {
            "measurement": "Light",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": vis
            }
        },
        {
            "measurement": "IR",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": IR
            }
        },
        {
            "measurement": "uvIndex",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": uvIndex
            }
        },
        {
            "measurement": "temp",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": temp
            }
        },
        {
            "measurement": "humid",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": humid
            }
        },
        {
            "measurement": "press",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": press
            }
        },
        {
            "measurement": "eCO2",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": eCO2
            }
        },
        {
            "measurement": "TVOC",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": TVOC
            }
        },
        {
            "measurement": "P",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": P
            }
        },
        {
            "measurement": "Q",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": Q
            }
        },
        {
            "measurement": "pfstatus",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": pfstatus
            }
        },
        {
            "measurement": "wind_speed",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": wind_speed
            }
        },
        {
            "measurement": "wind_direction",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": wind_direction
            }
        },
        {
            "measurement": "wind_angle",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": wind_angle
            }
        },
        {
            "measurement": "precip_rate",
            "tags": {
                "host": "server01",
                "region": "us-east"
            },
            "time": timestamp.strftime("%Y-%m-%dT%H:%M:%S"),
            "fields": {
                "value": precip_rate
            }
            
        }
    ]
    
    client.write_points(json_body)
        
if __name__ == "__main__":
    
    # Connect to influx host
    client = InfluxDBClient(host='169.254.153.103', port=8086)
    
    # Use 'example' database
    client.switch_database('example')
    

    
    every_minute()
    
    signal.pause()
