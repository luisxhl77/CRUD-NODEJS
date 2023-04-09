const mongoose = require('mongoose');
import express from "express";
import morgan from "morgan";

// Routers
import customerRoutes from "./routes/customer.routes";

const app = express();

// setting
app.set("port", 3000);

// middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes api
app.use("/api/v1/customers", customerRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/Customer', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    // useFindAndModify: false,
    // useCreateIndex: true
})
  .then(() => console.log('Connected!'))
  .catch((e) => console.log('not Connected!',e));


export default app;