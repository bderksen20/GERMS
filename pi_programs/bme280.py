import board
import digitalio
import busio
import time
import adafruit_bme280


def bme():
    i2c = busio.I2C(board.SCL, board.SDA)
    
    #read in data twice to get rid of data saved from last reading
    for x in range(2):
        bme280 = adafruit_bme280.Adafruit_BME280_I2C(i2c)
    
    # the number 1013.25 is the global average, may need to update
    bme280.sea_level_pressure = 1013.25
    humid = bme280.relative_humidity
    press = bme280.pressure
    tempC = bme280.temperature
    #convert to F
    tempF = tempC * (9/5) + 32

    #temp in F, humid in %, press in hPa
    return tempF, humid, press



