import time
import RPi.GPIO as GPIO

# Define GPIO pins
anemo_GPIO = 10

# Define global constants
t_run = 20 # Run for 20 seconds
speed_per_freq = 2.4 # 1 Hz equates to 2.4km/s

# Define global variables
counter = 0
t_first = None # Time of first rotation
t_rotation = None # Time of most recent rotation

# Function to run after complete rotation
def rotation_callback(channel):
    global counter, t_rotation, t_first
    t_rotation = time.time() # Update time of most recent rotation
    
    if counter == 0:
        t_first = t_rotation # Record time of first rotation
    counter += 1

# Main function
def anemo():
    global counter, t_rotation, t_first, t_run, speed_per_freq
    
    # Reset counter
    counter = 0
    
    # Configure GPIO pins
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(anemo_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    
    # Enable interrupts
    GPIO.add_event_detect(anemo_GPIO, GPIO.FALLING,
                          callback=rotation_callback,
                          bouncetime=7)
    
    # Allow interrupts to run
    time.sleep(t_run)
    
    # Disable interrupts
    GPIO.remove_event_detect(anemo_GPIO)
    GPIO.cleanup()
    
    if counter > 1:
        # Calculate windspeed
        windspeed = (counter-1)*speed_per_freq/(t_rotation - t_first)
    else:
        windspeed = 0.0
        
    return windspeed
    
