import time
import RPi.GPIO as GPIO

# Define GPIO pin
precip_GPIO = 9

# Define global constants
t_run = 20 # Run for 20 seconds
rain_per_close = 0.2794 # 1 switch close equates to 0.2794mm of rain

# Define global variables
counter = 0
t_first = None # Time of first close
t_switchclose = None # Time of most recent close

# Function to run when switch closes
def switchclose_callback(channel):
    global counter, t_first, t_switchclose
    t_switchclose = time.time() # Update time of most recent switch close
    
    if counter == 0:
        t_first = t_switchclose # Record time of most recent switch close
    
    counter += 1

# Main function
def precip():
    global counter, t_switchclose, t_first, t_run, rain_per_close
    
    # Reset counter
    counter = 0
    
    # Configure GPIO pins
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(precip_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    
    # Enable interrupts
    GPIO.add_event_detect(precip_GPIO, GPIO.FALLING,
                          callback=switchclose_callback,
                          bouncetime=7)
    
    # Allow interrupts to run
    time.sleep(t_run)
    
    # Disable interrupts
    GPIO.remove_event_detect(precip_GPIO)
    GPIO.cleanup()
    
    if counter > 1:
        # Calculate precipation rate
        precip_rate = (counter-1)*rain_per_close/(t_switchclose - t_first)
    else:
        precip_rate = 0.0
        
    return precip_rate
    
