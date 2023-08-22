import express from "express";
import dotenv from "dotenv";
import  connectDB  from  "./config/DB.js"
import authRoutes from './route/authRoute.js'
import categoryRoute from './route/categoryRoute.js'
import morgan from "morgan";
import cors from "cors";
import productRoute from './route/productRoute.js'

const app =express()

// //for port we are getting from .env
dotenv.config()

// //middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// //conncting to database
connectDB();


// //routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)

app.get("/",(req,res) =>
{
    res.send("<h1>hello</h1>")
})

const port = process.env.PORT || 4000;
app.listen(port,()=>{
     console.log("listining to port")
}) 

// // import express from "express";
// // import dotenv from "dotenv";
// // import connectDB from "./config/DB.js";
// // import authRoutes from "./route/authRoute.js";
// // import categoryRoute from "./route/categoryRoute.js";
// // import morgan from "morgan";
// // import cors from "cors";
// // import productRoute from "./route/productRoute.js";
// import http from "http"; // Import the built-in HTTP module
// import WebSocket from "ws"; // Import the 'ws' library

// const app = express();
// const server = http.createServer(app); // Create an HTTP server instance

// // ... (Rest of your code remains the same)

// // Creating a WebSocket server instance
// const wss = new WebSocket.Server({ server });

// // WebSocket Connection Handling
// wss.on("connection", (socket) => {
//   console.log("WebSocket connected");

//   // WebSocket Message Handling
//   socket.on("message", (message) => {
//     console.log("Received message:", message);
//     // Process the message and send a response if needed
//     socket.send("Received your message: " + message);
//   });

//   // WebSocket Disconnection Handling
//   socket.on("close", () => {
//     console.log("WebSocket disconnected");
//   });
// });

// const port = process.env.PORT || 4000;
// server.listen(port, () => {
//   console.log("Listening to port", port);
// });
