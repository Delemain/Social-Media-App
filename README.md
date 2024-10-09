# ASD 2024 - Group 6 - Social Media App
Welcome to the Social Media App project! This is a social media platform built using **Next.js** for the frontend and **Spring Boot** for the backend. The app includes features such as account management, user authentication, access logs, a news feed, and post interactions.

## Repository Structure
/social-media-app  
├── backend-BootStrap/              # Backend code with Spring Boot  
│   ├── src/  
│   │   ├── main/  
│   │   │   ├── java/  
│   │   │   │   ├── socialmediaapp/  
│   │   │   │   │   ├── Controllers/           # Backend logic (Griffin, Karan, Deep)  
│   │   │   │   │   ├── Models/                # Data models for User, Posts, etc.  
│   │   │   │   │   ├── Repositories/          # Data access layers (CRUD operations)  
│   │   │   │   │   └── SocialMediaAppApplication.java  # Main application entry point  
│   │   └── resources/  
│   │       └── application.properties        # Configuration properties  
├── frontend-Next/                 # Frontend code with Next.js (Deep  
│   ├── pages/  
│   │   ├── login.tsx              # Login feature (Deep)  
│   │   ├── register.tsx           # Registration feature (Deep)  
│   │   ├── account.tsx            # Account management (Karan)  
│   │   └── accesslogs.tsx         # Access logs view (Karan)  
│   ├── public/                    # Static assets such as images  
│   └── styles/                    # CSS and global styles  
└── README.md                      # Project documentation  


## Responsibilities

### Team Members and Their Roles

- **Deep**  
  - Responsible for the **setup of the Next.js project**, and development of the **Login** and **Register** features.
  
- **Karan**  
  - Responsible for implementing **Account Management** and managing **Access Logs**.

- **Griffin**  
  - Responsible for setting up **Spring Boot** and developing the **News Feed** and **Post Interactions** features.

## Features

- **Login/Register**: Handles user authentication (Deep)
- **Account Management**: Allows users to update their profile information (Karan)
- **Access Logs**: Tracks and displays user activity (Karan)
- **News Feed and Post Interactions**: Displays posts from users and enables likes/comments (Griffin)

## Running the Project

### Backend

1. Navigate to the `frontend-Next` directory.
2. Run the following command to start the Spring Boot application: ```mvn spring-boot:run```

### Frontend

1. Navigate to the `backend-BootStrap` directory.
2. Run the following commands to install dependencies and start the application:
```
npm install
npm run dev
```
