# GERMS - Green Energy Rooftop Measurement System

A senior design capstone project for undergraduate electrical and computer engineering (ECE) studies at The University of Pittsburgh by...
   - [Bill Derksen](https://github.com/bderksen20): software and computer engineering
   - [Evan Gzesh](https://github.com/EvanGzesh): electrical engineering + pi programming
   - [Anthony Popovski](https://github.com/anthpops): electrical engineering + pi programming
   - [Daniel Morton](https://github.com/Daniel8942): electrical engineering + pi programming

### Overview
This repo contains software and programs used for our project.

### Stack

Python programs on Pi use InfluxDB client to establish connection with database and post (HTTP) processed sensor data over LAN (ethernet OR wireless). Data can also be sent over internet if desired, but will require some additional networking efforts. Currently, this project is configured to run on a dedicated server/machine which includes the database, backend, and frontend (rendered on a localhost domain). 

   - Database: InfluxDB
   - Backend: NodeJS + Express
   - Frontend: React

### Frontend

Below is an image of the current frontend. The table and plots each display the most recent data stored in the database and will update in realtime when new data is posted to the database. The table displays the single most recent reading for each sensor while the bar graph and cartesian plots show a user specified number of most recent points for the desired sensor measurement.

![frontend image](./images/frontend.png?raw=true "Title")

### Setup

1. Install NodeJS on machine, make sure that npm (node package manager) is also installed
2. Run `npm install` in the frontend directory [sofware_stack/.](./software_stack) to install necessary frontend packages 
3. Run `npm install` in the backend directory [sofware_stack/backend/.](./software_stack/backend) to install necessary backend packages 
