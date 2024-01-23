import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import dbConnect from "./config/dbConnect";
import { handleSocketConnection } from "./controller/socketController";
import { populateInitialChannels } from "./config/populateChannels";

dotenv.config();

const port = process.env.PORT || 4000;
const express = require("express");
export const app = express();
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

dbConnect();
app.use(cors());

// On server start, storage is populated with a fixed set of empty channels
populateInitialChannels();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Socket.io
io.on("connection", handleSocketConnection);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
