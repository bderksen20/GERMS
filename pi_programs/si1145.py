import time
import SI1145.SI1145 as SI1145

def si():
    sensor = SI1145.SI1145()

    vis = sensor.readVisible()
    IR = sensor.readIR()
    UV = sensor.readUV()
    uvIndex = UV / 100.0
    
    # TODO MAKE FLOAT
    vis = int((vis - 256) / 1.47)
    
    return vis, IR, uvIndex
        

    