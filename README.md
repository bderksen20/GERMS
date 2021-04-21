# GERMS - Green Energy Rooftop Measurement System

A senior design capstone project for undergraduate electrical and computer engineering (ECE) studies at The University of Pittsburgh by...
   - [Bill Derksen](https://github.com/bderksen20): role
   - [Evan Gzesh](https://github.com/EvanGzesh): role
   - [Anthony Popovski](https://github.com/anthpops): role
   - [Daniel Morton](https://github.com/Daniel8942): role

### Overview
Project overview and description.....

### Stack

Python programs on Pi use InfluxDB client to establish connection with database and post (HTTP) processed sensor data over LAN (ethernet OR wireless). Data can also be sent over internet if desired, but will require some additional networking efforts. Currently, this project is configured to run on a dedicated server/machine which includes the database, backend, and frontend (rendered on a localhost domain). 

   - Database: InfluxDB
   - Backend: NodeJS + Express
   - Frontend: React

### Frontend

![frontend image](./images/frontend.png?raw=true "Title")
