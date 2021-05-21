import time
import RPi.GPIO as GPIO
import numpy

# Define GPIO pins
Vzc_GPIO = 16
Izc_GPIO = 6

# Define global constants
t_run = 5 # Run for 5 seconds
delta_t = -0.00135 # Accounts for phase offset due to measurement error. If angle is incorrect, try flipping the sign. Sometimes this fixes the problem but we're not sure why
pi = 3.1415926535897

# Define global variables
t_Vzc = None # Time of most recent voltage zero cross
t_Izc = None # Time of most recent current zero cross
t_Vzc_first = None # Time of first voltage zero cross
t_elapsed = [] # Array of elpased times between voltage and current zero cross
counter = 0

# Function to run on voltage zero-cross
def Vzc_callback(channel):
    global t_Vzc
    t_Vzc = time.time() # Update time of most recent voltage zero cross

    global t_Vzc_first, counter
    if counter==0:
        t_Vzc_first = t_Vzc # Record time of first voltage zero cross

    counter += 1 # Increment counter

# Function to run on current zero-cross
def Izc_callback(channel):
    global t_Izc
    t_Izc = time.time() # Update time of most recent current zero cross
        
    global t_Vzc, t_elapsed
    if t_Vzc != None:
        t_elapsed.append(t_Izc-t_Vzc) # Calculate elapsed time between most recent voltage and current zero cross, and append to array

# Main function
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
        # Compute average elapsed time
        t_elapsed_np = numpy.array(t_elapsed) # Convert to numpy array
        t_elapsed_ave = numpy.average(t_elapsed_np) # Calculate average elapsed time
    else:
        t_elapsed_ave = None
    
    if counter >1:
        # Calculate frequency
        freq = (counter-1)/(t_Vzc - t_Vzc_first)
        
    else:
        freq = 0
    
    if t_elapsed_ave != None:
        # Calculate phase
        phase = (t_elapsed_ave - delta_t)*freq*2*pi
    else:
        phase = 0
    
    if phase > pi:
        phase = phase-2*pi
    
    return phase, freq
