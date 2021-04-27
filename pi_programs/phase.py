import time
import RPi.GPIO as GPIO
import numpy

# Define GPIO pins
Vzc_GPIO = 16
Izc_GPIO = 6

# Define global constants
t_run = 5
#delta_t = 0.00135 # Still needs calibration
delta_t = -0.00135
pi = 3.1415926535897

# Define global variables
t_Vzc = None
t_Izc = None
t_Izc_first = None
t_elapsed = []
counter = 0

# Function to run on voltage zero-cross
def Vzc_callback(channel):
    global t_Vzc
    t_Vzc = time.time()

    global t_Vzc_first, counter
    if counter==0:
        t_Vzc_first = t_Vzc

    counter += 1

# Function to run on current zero-cross
def Izc_callback(channel):
    global t_Izc
    t_Izc = time.time()
        
    global t_Vzc, t_elapsed
    if t_Vzc != None:
        t_elapsed.append(t_Izc-t_Vzc)

def phase():
    global t_Vzc, t_Izc, t_Izc_first, t_elapsed, counter, delta_t, t_run, pi
    
    # Reset clobal variables
    t_Vzc = None
    t_elapsed = []
    counter = 0
    
    # Configure GPIO pins
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(Vzc_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.setup(Izc_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    
    # Enable interrupts
    GPIO.add_event_detect(Vzc_GPIO, GPIO.RISING,
                          callback=Vzc_callback,
                          bouncetime=12)
    GPIO.add_event_detect(Izc_GPIO, GPIO.RISING,
                          callback=Izc_callback,
                          bouncetime=12)
    
    # Allow interrupts to run
    time.sleep(t_run)
    
    # Disable interrupts
    GPIO.remove_event_detect(Vzc_GPIO)
    GPIO.remove_event_detect(Izc_GPIO)
    GPIO.cleanup()
    
    if len(t_elapsed)>0:
        # Compute average
        t_elapsed_np = numpy.array(t_elapsed)
        t_elapsed_ave = numpy.average(t_elapsed_np)
    else:
        t_elapsed_ave = None
    
    if counter >1:
        # Calculate frequency and phase
        freq = (counter-1)/(t_Vzc - t_Vzc_first)
        
    else:
        freq = 0
    
    if t_elapsed_ave != None:
        phase = (t_elapsed_ave - delta_t)*freq*2*pi
    else:
        phase = 0
    
    if phase > pi:
        phase = phase-2*pi
    
    return phase, freq