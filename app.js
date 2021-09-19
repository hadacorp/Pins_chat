const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
var host = 'localhost';
var port = 3001;
const io = require('socket.io')(server)
const db = require("./config/db");
const insertModel = require("./model/insertModel");

// 소켓 연결 코드
io.sockets.on('connection', (socket) => {
  console.log(`Socket connected : ${socket.id}`)
  
  // 채팅방 입장
  socket.on('enter', async (data) => {
    const roomData = JSON.parse(data)
    const usernickname = roomData.username
    const roomNumber = roomData.roomNumber
    const userid = roomData.userid

    try{
      const insertChat = await insertModel.addEnter(roomNumber,new Date(),userid,usernickname);
      console.log(insertChat)
      socket.join(`${roomNumber}`)
      console.log(`[Username : ${usernickname}] entered [room number : ${roomNumber}]`)
      
      const enterData = {
        type : "ENTER",
        content : `${usernickname} entered the room`  
      }
      socket.broadcast.to(`${roomNumber}`).emit('update', JSON.stringify(enterData))
    }catch(error){
      console.error(error);
    }
    

  })

  // 채팅방 나가기
  socket.on('left', async (data) => {
    const roomData = JSON.parse(data)
    const usernickname = roomData.username
    const roomNumber = roomData.roomNumber
    const userid = roomData.userid

    try{
      const insertChat = await insertModel.addLeft(roomNumber,new Date(),userid,usernickname);
      console.log(insertChat)
      socket.leave(`${roomNumber}`)
      console.log(`[Username : ${usernickname}] left [room number : ${roomNumber}]`)

      const leftData = {
        type : "LEFT",
        content : `${usernickname} left the room`  
      }
      socket.broadcast.to(`${roomNumber}`).emit('update', JSON.stringify(leftData))
    }catch(error){
      console.error(error);
    }
  })

  // 메세지 입력시 
  socket.on('Message', async (data) => {
    const messageData = JSON.parse(data)
    try{
      const insertChat = await insertModel.addMessage(messageData.to,new Date(),messageData.userid,messageData.content);
      console.log(insertChat)
      console.log(`[Room Number ${messageData.to}] ${messageData.from} : ${messageData.content}`)
      socket.broadcast.to(`${messageData.to}`).emit('update', JSON.stringify(messageData))
    }catch(error){
      console.error(error);
    }
  })

 // 이미지 전송시
  socket.on('Image', (data) => {
    const messageData = JSON.parse(data)
    try{
      const insertChat = await insertModel.addMessage(messageData.to,new Date(),messageData.userid,messageData.content);
      console.log(insertChat)
      console.log(`[Room Number ${messageData.to}] ${messageData.from} : ${messageData.content}`)
      socket.broadcast.to(`${messageData.to}`).emit('update', JSON.stringify(messageData))
    }catch(error){
      console.error(error);
    }
  })
  // 소켓 연결 끊기
  socket.on('disconnect', () => {
    console.log(`Socket disconnected : ${socket.id}`)
  })
})


//서버port 지정 
server.listen(9091, host,() => {
  console.log(`Server listening at http://localhost:9091`)
})
