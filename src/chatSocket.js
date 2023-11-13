const {Server} = require("socket.io");

const setCorsSocketIo = (server)=>{
    return new Server(server,{
        cors:{
                origin:"http://localhost:3000", //react path
                methods:["GET","POST"]//req
            }
        });
}

const chatConnection = (io)=>{
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
}

const Chat = (server) =>{
   return chatConnection( setCorsSocketIo(server))
}

module.exports = Chat;