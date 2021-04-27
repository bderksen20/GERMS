import math
import time
import board
import busio
import adafruit_ads1x15.ads1015 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import numpy


i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1015(i2c)
chan = AnalogIn(ads, ADS.P0)
    
ads.gain = 1
ads.mode = 0
    
def vrms():

    Vin = []
    runtime = 3
    t_end = time.time() + runtime
    
    while time.time() < t_end:
        Vin.append(chan.voltage)
    N = len(Vin)
    
    Vin_np = numpy.array(Vin)
    Vavg = numpy.average(Vin_np)

    sum = 0
    for i in Vin:
        V = i - Vavg
        Vsquare = V ** 2
        sum = sum + Vsquare
        
    Vrms_unscaled = (sum/N) ** (1/2)
    print("vrms unscaled = %f" % Vrms_unscaled)
    
    return Vrms_unscaled