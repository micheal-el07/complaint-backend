 # Complaint Report Management System

This is the backend system for the complaints report management system develop for Leogics technical assessment.
##### Note: Details regarding the development process for this project is in Documentation folder.

## Prerequisites

Before getting started, you need to have the following tool/s installed:

- **Docker Engine**.

If you don't have Node.js installed, you can get it from [here](https://docs.docker.com/get-started/get-docker/).

##### Note: This application is developed on Windows 11.


## Clone the Repository

First, clone the repository to your local machine, you can choose to use windows powershell or git bash (run as admin):

```bash
git clone https://github.com/micheal-el07/complaint-backend.git
cd complaint-backend
```

## Setup ( I'm currently using git bash in Windows 11 )
1. Make sure you docker engine is installed and running.

```bash
docker --version
docker-compose --version # If using Docker Compose v1
docker compose version # If using Docker Compose v2 (integrated into Docker) 
```

2. To initialize the docker container:
   
```bash
docker-compose up --build
```

#### If my-app container in the complaint container shows any error, you can try restart it first by using the bellow command
```bash
docker restart <container-id>
```

3. Accessing the application:
   
- After the installation of the container successful, you can go to your browser and type in http://127.0.0.1:4000/api-docs
- You can see a Swagger API documentation where you can interact with the system.
 
- Upon successful installation, the complaint container should have three other sub-container which are:
- 1. The complaint backend system
  2. The Postgres database for complaint system
  3. The text classification system 




