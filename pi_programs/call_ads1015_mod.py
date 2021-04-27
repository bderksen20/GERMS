import ads1015_mod, time

vrms = ads1015_mod.vrms()
irms = ads1015_mod.irms()
[direc, angle] = ads1015_mod.getdirection()
print(direc)
