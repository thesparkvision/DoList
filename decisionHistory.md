## 17 November 2023

### User Authentication, Password Recovery

-   Decided to have another table to manage JWT Tokens which would be used for user login management,
    storing password recovery tokens, etc. for short period of times.

---

## 2 November 2023

### Initial DB Design

- Created Initial DB Design based on which I am designing the backend API Service
- Added DB Documentation File to the codebase so it can be maintained and updated with time

---

## 1 November 2023

### Deciding Backend Tech Stack

-   I want to learn and use FastAPI in this project, so will be using that here. 

-   For Development workflow, will use poetry to track package dependencies.

### Deciding Frontend Tech Stack

-   I am familiar with React, so it will be easy to start with building a frontend app with that for time being. So, finalizing React, without any other considerations. 

-   Will be using SCSS, TypeScript in the app to learn to use them in a frontend application together.

-   Using Vite as a build tool after reading [this official guide](https://vitejs.dev/guide/). Want faster reload for this small size project to fasten the development process

### Created client and server folder in the repository

-   Since, only one developer is ideally working on this app, it would be easy to manage both frontend and backend on same repository.
    
-   Changes can be easily rollbacked. 
    
-   Pipelines management for different build is not that tricky and can be achieved.