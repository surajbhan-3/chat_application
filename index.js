const express = require("express");
const fs=require("fs")
const path=require("path")
const  socketio= require("socket.io");
const http = require("http");
const app=express()
 app.use(express.json())

 const Path=path.join(__dirname,"./frontend")
 console.log(Path,"kdfjdkkk")
 
 app.use(express.static(Path+"/public"))
 
 console.log(Path,"dflsjkd")
 
 
 
 
 const server = http.createServer(app)
 app.get("/",(req,res)=>{
           res.send("Welcome to home page")
 })

 app.get("/chat/frontend", async(req,res)=>{
 
       try {
         const frontendPath = path.join(__dirname, './frontend/index.html');
         console.log(frontendPath)
   
         res.sendFile(frontendPath)
       } catch (error) {
         console.log(error)
       }
 })

/// Socket.io  setup : used for biderctional communicataion and event-based communication

const io =   socketio(server);

var users={}

io.on("connection",(socket)=>{

      console.log(socket.id)
      socket.on("new-user-joined",(username)=>{

            users[socket.id]=username;
            console.log(users)
           socket.broadcast.emit("user-connected",username)
           io.emit("user-list",users)
      });


    socket.on("message",(data)=>{
      socket.broadcast.emit("message",{user:data.user,msg:data.msg})
    })

      

      socket.on("disconnect",()=>{
        socket.broadcast.emit("user-disconnected",users=users[socket.id]);
         delete users[socket.id];
         io.emit("user-list",users)

      })
         
});










server.listen(4500,async()=>{
     try {
       await  connection
     } catch (error) {
      
     }
    console.log("chat server is running 4500")
})