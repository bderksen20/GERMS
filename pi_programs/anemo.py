import time
import RPi.GPIO as GPIO

anemo_GPIO = 10

t_run = 20
speed_per_freq = 2.4

counter = 0
t_first = None
t_rotation = None

def rotation_callback(channel):
    global counter, t_rotation, t_first
    t_rotation = time.time()
    
    if counter == 0:
        t_first = t_rotation
    counter += 1

def anemo():
    global counter, t_rotation, t_first, t_run, speed_per_freq
    
    counter = 0
    
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(anemo_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    
    GPIO.add_event_detect(anemo_GPIO, GPIO.FALLING,
                          callback=rotation_callback,
                          bouncetime=7)
    
    time.sleep(t_run)
    GPIO.remove_event_detect(anemo_GPIO)
    GPIO.cleanup()
    
    if counter > 1:
        windspeed = (counter-1)*speed_per_freq/(t_rotation - t_first)
    else:
        windspeed = 0.0
        
    return windspeed
    