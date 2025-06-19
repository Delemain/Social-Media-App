# ASD 2024 - Group 6 - Social Media App
Welcome to the Social Media App project! This is a social media platform built using **Next.js** for the frontend and **Spring Boot** for the backend. The app includes features such as account management, user authentication, access logs, a news feed, and post interactions.  

## Responsibilities

### Team Members and Their Roles

- **Deep**  
  - Responsible for the **setup of the Next.js project**, and development of the **Login** and **Register** features.

- **Maxim**
 - Responsible for making the **Direct Messaging** and **Group Chat** feature, integrating it with the account functionality.
  
- **Karan**  
  - Responsible for implementing **Account Management** and managing **Access Logs**.

- **Griffin**  
  - Responsible for setting up **Spring Boot** and developing the **News Feed** and **Post Interactions** features.

## Features

- **Login/Register**: Handles user authentication (Deep)
- **Account Management**: Allows users to update their profile information (Karan)
- **Access Logs**: Tracks and displays user activity (Karan)
- **News Feed and Post Interactions**: Displays posts from users and enables likes/comments (Griffin)
- **Direct Messaging**: Allows a user account to have a list of messages between any other user. Messages can be both sent and deleted.
-**Group Chat**: Allows a user to create a group chat, that includes a list of other users. All users in the chat will be able to view messages, send and delete messages. The creator of the chat is the Admin and can delete the entire chat and manage the users within it.

## Running the Project

### Backend

1. Navigate to the `backend-BootStrap` directory.
2. Run the following command to start the Spring Boot application: ```mvn spring-boot:run```

### Frontend

1. Navigate to the `frontend-Next` directory.
2. Run the following commands to install dependencies and start the application:
```
npm install
npm run dev
```
