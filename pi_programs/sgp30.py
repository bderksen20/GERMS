import busio
import adafruit_sgp30
import board

def sgp():
    i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)
    sgp30 = adafruit_sgp30.Adafruit_SGP30(i2c)
    
    #check datasheet for more info on the baseline
    sgp30.iaq_init()
    sgp30.set_iaq_baseline(0x8973, 0x8AAE)
    
    eCO2, TVOC = sgp30.iaq_measure()
    
    #alternate method of getting values
    #eCO2 = sgp30.eCO2
    #TVOC = sgp30.TVOC
    
    #eCO2 in ppm, TVOC in ppb
    return eCO2, TVOC
