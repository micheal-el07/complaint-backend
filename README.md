 # Complaint Report Management System

This is the backend system for the complaints report management system develop for Leogics technical assessment.

## Prerequisites

Before getting started, you need to have the following tool/s installed:

- **Docker Engine**.

If you don't have Node.js installed, you can get it from [here](https://docs.docker.com/get-started/get-docker/).

##### Note: This application is developed on Windows 11, hence these command are run using .


## Clone the Repository

First, clone the repository to your local machine, you can choose to use windows powershell or git bash (run as admin):

```bash
git clone https://github.com/micheal-el07/backend-arkmind.git
cd your-repository
```

## Setup
1. Navigate to the backend folder

```bash
cd backend
```

2. Install dependencies:
   
```bash
npm install
```

3. Environment Variables:
   
- Copy the .env.example file to .env:
```bash
cp .env.example .env
```
- Edit the .env file based to your configuration values (database credentials)

4. Database setup:
- Get into mysql cli
```bash
mysql -u root -p
```
- Enter your mysql root password

- Create new database (named inventory or anything suitable):
```bash
CREATE DATABASE inventory;
```
- And switch to the newly created database
```bash
use inventory;
```
- Copy and paste this sql to create an item table:
```sql
```


##### Note: Remember to add the database name and table into the .env file according to what you have setup in the database setup.

5. Run the backend:
```bash
npm run start
```

The backend should now be running on http://localhost:4000 by default (or another port based on your configuration).

