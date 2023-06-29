import express from "express";
import { json } from "body-parser";
import smsRoutes from "./routes/sms";
import { errorHandler } from "./middleware/error-handler";
const app = express();

app.use(json());
app.use(smsRoutes);
app.use(errorHandler);
export default app;

// Number
// Name
// Msg
// Date
// Dec
// Type
