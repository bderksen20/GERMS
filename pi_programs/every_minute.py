import threading
import math
import time
import board
import busio
import adafruit_ads1x15.ads1015 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

def SI1145_func():
    #Code goes here
    
    #Dummy data
    vis = 400
    IR = 600
    UV = 5.0
    
    return [vis, IR, UV]

def BME280_func():
    #Code goes here
    
    #Dummy data
    temp = 25.0
    hum = 50.0
    press = 1000.0
    
    return [temp, hum, press]

def SGP30_func():
    #Code goes here
    
    #Dummy data
    CO2 = 400
    TVOC = 550

    return [CO2, TVOC]

def Vrms_func():
    #Code goes here
    
    #Dummy data
    Vrms = 120.0
    
    return Vrms

def Irms_func():
    #Code goes here
    
    #Dummy data
    Irms = 14.0
    
    return Irms

def phase_func():
    #Code goes here
    
    #Dummy data
    theta = math.pi/3
    
    freq = 60.0
    
    return [theta, freq]
    
def power_func(Vrms, Irms, theta, freq):
    
    P = Vrms*Irms*math.cos(theta)
    Q = Vrms*Irms*math.cos(theta)
    
    return [P, Q]

def anemo_func():
    #Code goes here

    #Dummy data
    wind_speed = 12.0
    
    return wind_speed

def vane_func():
    #Code goes here
    #Assign ADC Output to int value
    chan = AnalogIn(ads, ADS.P2)
    directionbit = chan.value;

#logic
    if directionbit>1612 #midway between 1601,1623
	    wind_degrees = 270.0 
	    wind_direction = "West"
    
    elif directionbit>1588 #midway between 1575,1601
	    wind_degrees = 315.0 
	    wind_direction = "NW"

    elif directionbit>1566 #midway between 1556,1575
	    wind_degrees = 292.5
	    wind_direction = "WNW"

    elif directionbit>1534 #midway between 1512,1556
    	    wind_degrees = 0.0
	    wind_direction = "North"

    elif directionbit>1489 #midway between 1466,1512
	    wind_degrees = 337.5
	    wind_direction = "NNW"

    elif directionbit>1456 #midway between 1445,1466
	    wind_degrees = 225.0
	    wind_direction = "SW"

    elif directionbit>1386 #midway between 1327,1445
    	    wind_degrees = 247.5
	    wind_direction = "WSW"

    elif directionbit>1296 #midway between 1265,1327
	    wind_degrees = 45.0
	    wind_direction = "NE"

    elif directionbit>1178 #midway between 1090,1265
	    wind_degrees = 22.5
	    wind_direction = "NNE"

    elif directionbit>1049 #midway between 1007,1090
	    wind_degrees = 180.0
	    wind_direction = "South"

    elif directionbit>936 #midway between 865,1007
	    wind_degrees = 202.5
	    wind_direction = "SSW"

    elif directionbit>774 #midway between 682,865
	    wind_degrees = 135.0
	    wind_direction = "SE"

    elif directionbit>616 #midway between 549,682
	    wind_degrees = 157.5
	    wind_direction = "SSE"

    elif directionbit>529 #midway between 508,549
	    wind_degrees = 90.0
	    wind_direction = "East"

    elif directionbit>465 #midway between 422,508
	    wind_degrees = 67.5
	    wind_direction = "ENE"
    else
	    wind_degrees = 112.5
	    wind_direction = "ESE"
    
    #Dummy data
    #wind_degrees = 270
    
    return wind_degrees
    return wind_direction

def precip_func():
    #Code goes here
    
    #Dummy data
    precip = 0.2794
    
    return precip
    
def every_minute():
    threading.Timer(5, every_minute).start()
    print("Begin")
    
    #Visible Light, Infrared, and UV index
    [vis, IR, UV] = SI1145_func()
    
    #Temperature, Pressure, and Humidity
    [temp, hum, press] = BME280_func()
    
    #CO2 and TVOC
    [CO2, TVOC] = SGP30_func()
    
    # Power measurements
    Vrms = Vrms_func()
    Irms = Irms_func()
    [theta, freq] = phase_func()
    
    [P, Q] = power_func(Vrms, Irms, theta, freq)
    
    #Wind speed
    wind_speed = anemo_func()
    
    #Wind direction
    wind_direction = vane_func()
    
    #Precipitation
    precip = precip_func()
    
    #Time and date
    localtime = time.asctime(time.localtime(time.time()))
    
    #Write to text file
    buffer_file = open("buffer_file.txt","a")
    buffer_file.write("%s, %d, %d, %f, %f, %f, %f, %d, %d, %f, %d, %f, %f, %f\n" % (localtime, vis, IR, UV, temp, hum, press, CO2, TVOC, wind_speed, wind_direction, precip, P, Q))
    buffer_file.close()

every_minute()
