# task-management-system-backend

**Here's the frontend Repository Url**
<https://github.com/khushboopaddiyar/task-management-system-frontend>

## Install Dependencies
```
npm i
```

**You will need MongoDB locally installed or you can also use MongoDB Atlas**

## Setup .env file

**For Linux Users**
```
cp .env.example .env
```

**For Windows Users**
```
copy .env.example .env
```

### Now set the values for variables in .env  file

`For Example`
```
NODE_ENV=development
PORT=5000
MONGODB_URL=mongodb+srv://username:password@cluster0-drwrt.mongodb.net/taskManagementSystem?retryWrites=true&w=majority
JWT_SECRET=secret
```

*Use your own MongoDB Url*
*You can also set these values in environment variables.*

## Run the Development Server
```
npm run dev
```

## Build and Start the Server
```
npm start
```

## Build the project
```
npm run build
```

## Run the Production Server
```
npm run prod
```
