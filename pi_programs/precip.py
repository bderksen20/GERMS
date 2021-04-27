import time
import RPi.GPIO as GPIO

precip_GPIO = 9

t_run = 20
rain_per_close = 0.2794 #millimeters

counter = 0
t_first = None
t_switchclose = None

def switchclose_callback(channel):
    global counter, t_first, t_switchclose
    t_switchclose = time.time()
    
    if counter == 0:
        t_first = t_switchclose
    
    counter += 1

def precip():
    global counter, t_switchclose, t_first, t_run, rain_per_close
    
    counter = 0
    
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(precip_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    
    GPIO.add_event_detect(precip_GPIO, GPIO.FALLING,
                          callback=switchclose_callback,
                          bouncetime=7)
    
    time.sleep(t_run)
    GPIO.remove_event_detect(precip_GPIO)
    GPIO.cleanup()
    
    if counter > 1:
        precip_rate = (counter-1)*rain_per_close/(t_switchclose - t_first)
    else:
        precip_rate = 0.0
        
    return precip_rate
    
