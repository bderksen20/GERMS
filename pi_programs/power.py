import math

def power(Vrms_unscaled, Irms_unscaled, freq, phase):
     
    freq = round(freq, 0)

     #since there is an RC LP filter, frequency impacts the voltage and current magnitude
     # for simplicity, only range from 55 to 65 Hz is accounted for, and at 1 Hz intervals
     # these values were determined using an ADALM2000 to perform a frequency sweep on the filters
    if freq <= 55.0:
        freq = 55.0
    if freq >= 65.0:
        freq = 65.0
    
     #scaling factors determined by lookup table for current and voltage
     #these scaling factors account for current/voltage transformer and the filter
    iLookup = {55.0:86.5699, 56.0:85.9740, 57.0:85.3821, 
               58.0:84.6968, 59.0:84.1138, 60.0:83.3426,
               61.0:82.7689, 62.0:82.1991, 63.0:81.5393, 
               64.0:81.0713, 65.0:80.4206}

    vLookup = {55.0:334.256, 56.0:331.573, 57.0:329.291,
               58.0:327.024, 59.0:324.586, 60.0:322.166,
               61.0:319.764, 62.0:317.746, 63.0:315.195,
               64.0:313.386, 65.0:310.871}
    
    Iscale = iLookup[freq]
    Vscale = vLookup[freq]
    
    
    #these are the actual values
    Vrms = Vrms_unscaled * Vscale
    Irms = Irms_unscaled * Iscale
    pf = math.cos(phase)
    print("Vrms: %f" % Vrms)
    print("Irms: %f" % Irms)
    
    #phase in radians
    P = Vrms * Irms * math.cos(phase)
    Q = Vrms * Irms * math.sin(phase)
    S = Vrms * Irms
    
    if phase > 0:
        pfstatus = "lagging"
    elif phase < 0:
        pfstatus = "leading"
    else:
        pfstatus = "unity"
        
    return P, Q, S, pf, pfstatus
