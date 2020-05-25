# task-management-system-backend

### Install Dependencies
```
npm i
```

## Setup .env file

**For Linux Users**
```
cp .env.example .env
```

**For Windows Users**
```
copy .env.example .env
```

#### Now set the values for variables in .env file

`For Example`
```
NODE_ENV=development
PORT=5000
MONGODB_URL=mongodb+srv://username:password@cluster0-drwrt.mongodb.net/taskManagementSystem?retryWrites=true&w=majority
JWT_SECRET=secret
```

*You can also set these values in environment variables*

### Run the Development Server
```
npm run dev
```

### Build and Start the Server
```
npm start
```

### Build the project
```
npm run build
```

### Run the Production Server
```
npm run prod
```