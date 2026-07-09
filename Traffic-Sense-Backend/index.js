const express = require('express');
const cors = require('cors');

const signalManagementRouter = require('./src/routers/intersection-management/index');
const userRouter = require('./src/routers/user/index');
require('./src/database/index');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.use(signalManagementRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});