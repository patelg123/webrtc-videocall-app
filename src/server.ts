import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import helmet from "helmet";
import path from "path";

export class Server {
 private httpServer: HTTPServer;
 private app: Application;
 private io: SocketIOServer;
 
 private readonly DEFAULT_PORT = 5000;
 
 constructor() {
   this.initialize();   
 }
 
 private initialize(): void {
   this.app = express();
   this.app.use(helmet());
   this.httpServer = createServer(this.app);
   this.io = socketIO(this.httpServer);
   
   this.configureApp();
   this.handleSocketConnection();

 }
  
 private handleSocketConnection(): void {
   this.io.on("connection", socket => {
     console.log("Socket connected.");
   });
 }
 
 private configureApp(): void {
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

 public listen(callback: (port: number) => void): void {
   this.httpServer.listen(this.DEFAULT_PORT, () =>
     callback(this.DEFAULT_PORT)
   );
 }
}