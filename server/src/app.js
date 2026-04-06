// server\src\app.js
import express from 'express'
import authRoute from './module/auth/auth.routes.js'
import tasksRoute from './module/tasks/tasks.routes.js'
import errorHandler from './common/middleware/error.middleware.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoute);
app.use("/api/", tasksRoute);

app.use(errorHandler);

export default app;