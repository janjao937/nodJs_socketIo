const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
const PORT = 3001;


app.use(cors());


const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000", //react path
        methods:["GET","POST"]//req
    }
});

//listen on the connection event for incoming sockets
io.on("connection",(e)=>{
    console.log("User connected",e.id);//user id

    e.on("join_room",(roomId)=>{
        e.join(roomId);
        console.log("USER WITH ID:",e.id,"Join Room",roomId);
    });


    //send_message event name like front
    e.on("send_message",(data)=>{
        e.to(data.room).emit("recive_message",data);
    });


    e.on("disconnect",()=>{
        console.log("User disconnect",e.id);
    });

});


server.listen(PORT,()=>{
    console.log("Server Start:",PORT);
})