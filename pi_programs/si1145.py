import time
import SI1145.SI1145 as SI1145

def si():
    sensor = SI1145.SI1145()

    #get data for visible, IR, and UV light
    vis = sensor.readVisible()
    IR = sensor.readIR()
    UV = sensor.readUV()
    uvIndex = UV / 100.0
    
    # Subtract 256 because sensor adds an offset of 256 to this value-see datasheet
    # Division by 1.47 is a scaling factor conversion between the unit the sensor reports (ADC counts) and irradiance (W/m^2)
    # This value was determined experimentally, and should be reevaluated
    vis = int((vis - 256) / 1.47)
    
    return vis, IR, uvIndex
        

    
