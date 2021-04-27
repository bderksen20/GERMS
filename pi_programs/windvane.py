import board
import busio
import adafruit_ads1x15.ads1015 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1015(i2c)
chan = AnalogIn(ads, ADS.P2)

ads.gain = 1
ads.mode = 0x100

def getdirection():

    
    directionbit = chan.value/16 #div by 16 to get expected value.  Why?  Is gain messed up?  Evan suggests that it is a 16 bit output
    print(directionbit)
    #logic
    if directionbit>1608: #midway between 1620,1596
        wind_degrees = 270.0 
        wind_direction = "West"

    elif directionbit>1582: #midway between 1596,1568
        wind_degrees = 315.0 
        wind_direction = "NW"

    elif directionbit>1558: #midway between 1568,1547
        wind_degrees = 292.5
        wind_direction = "WNW"

    elif directionbit>1523: #midway between 1547,1499
        wind_degrees = 0.0
        wind_direction = "North"

    elif directionbit>1475: #midway between 1499,1450
        wind_degrees = 337.5
        wind_direction = "NNW"

    elif directionbit>1439: #midway between 1450,1427
        wind_degrees = 225.0
        wind_direction = "SW"

    elif directionbit>1365: #midway between 1427,1302
        wind_degrees = 247.5
        wind_direction = "WSW"

    elif directionbit>1270: #midway between 1302,1237
        wind_degrees = 45.0
        wind_direction = "NE"

    elif directionbit>1146: #midway between 1237,1055
        wind_degrees = 22.5
        wind_direction = "NNE"

    elif directionbit>1012: #midway between 1055,969
        wind_degrees = 180.0
        wind_direction = "South"

    elif directionbit>898: #midway between 969,826
        wind_degrees = 202.5
        wind_direction = "SSW"

    elif directionbit>735: #midway between 826,644
        wind_degrees = 135.0
        wind_direction = "SE"

    elif directionbit>580: #midway between 644,515
        wind_degrees = 157.5
        wind_direction = "SSE"

    elif directionbit>495: #midway between 515,475
        wind_degrees = 90.0
        wind_direction = "East"

    elif directionbit>434: #midway between 475,393
        wind_degrees = 67.5
        wind_direction = "ENE"
    else:
        wind_degrees = 112.5
        wind_direction = "ESE"
    
    return wind_direction, wind_degrees