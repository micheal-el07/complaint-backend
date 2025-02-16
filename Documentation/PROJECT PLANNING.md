### Flow

#### Project Planning

## Complaint Backend System

![alt text](<Screenshot 2025-02-17 002437.png>)

1. Task was started with high level project flow planning, this give rough picture of how the system should flow.
2. Route that are involved also plan out, with the example of input body that will be received from user.



![alt text](<Screenshot 2025-02-17 001813.png>)

3. Detailed flow of the system with data types that will be going to be received and sent between system and user.
4. And that final shape of data that will be kept in the database.

![alt text](<Screenshot 2025-02-17 003913.png>)

5. 5 primary test case are recorded and compared with the classification that was given by the system.
6. The average response time the system take to process the data is around 3 second per request.

![alt text](<Screenshot 2025-02-17 002020.png>)

7. Tech-stack, Node JS with Typescript is choosen for this project as NodeJS can be considered as unopinionated frameworks.
8. This framework gave the opportunity for developers to plan and design their system accordingly without being tied to specific architecture or design.
9. Typescript enforced the used of type in declaring variables to ensure for type safety and it is more readable and easier to be maintain compared to Javascript.

## Text Classification System

![alt text](<Screenshot 2025-02-17 004407.png>)

10. The stack choosen for the text classification system is FastAPI framework, with python as this framework is the fasted among Python framework.
11. Python have the most support for machine learning oriented project as it have many libraries that supports for many use case for artificial intelligent with wide community support.
12. For the technique used to classify the text is zero-shot classification, this technique does not require prior field related data and able to classify text based on semantic relationship or description.


#### Challenges:
1. Minor - Deciding which database to be used, SQL or NoSQL, project with PostgreSQL since its the most fammiliar database with.
2. Deciding on how the error handling should be implimented, there are several ways of implementing error handling and some might seems simple but maybe lacks in details that can be helpful in debugging.
3. Working with testing is quite new and unfamiliar, as I don't quite use the automated testing and manually test my developed system.
4. Configuring the deployment on Docker, for some reason, some time in each build new error comes out, but most of them can be solved an usually due to how the Dockerfile and docker-compose file being structured.
