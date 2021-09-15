const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
var host = 'localhost';
var port = 3001;
const io = require('socket.io')(server)

// 소켓 연결 코드
io.sockets.on('connection', (socket) => {
  console.log(`Socket connected : ${socket.id}`)

  // 채팅방 입장
  socket.on('enter', (data) => {
    const roomData = JSON.parse(data)
    const username = roomData.username
    const roomNumber = roomData.roomNumber

    socket.join(`${roomNumber}`)
    console.log(`[Username : ${username}] entered [room number : ${roomNumber}]`)
    
    const enterData = {
      type : "ENTER",
      content : `${username} entered the room`  
    }
    socket.broadcast.to(`${roomNumber}`).emit('update', JSON.stringify(enterData))
  })

  // 채팅방 나가기
  socket.on('left', (data) => {
    const roomData = JSON.parse(data)
    const username = roomData.username
    const roomNumber = roomData.roomNumber

    socket.leave(`${roomNumber}`)
    console.log(`[Username : ${username}] left [room number : ${roomNumber}]`)

    const leftData = {
      type : "LEFT",
      content : `${username} left the room`  
    }
    socket.broadcast.to(`${roomNumber}`).emit('update', JSON.stringify(leftData))
  })
  // 메세지 입력시 
  socket.on('Message', (data) => {
    const messageData = JSON.parse(data)
    console.log(`[Room Number ${messageData.to}] ${messageData.from} : ${messageData.content}`)
    socket.broadcast.to(`${messageData.to}`).emit('update', JSON.stringify(messageData))
  })
 // 이미지 전송시
  socket.on('Image', (data) => {
    const messageData = JSON.parse(data)
    console.log(`[Room Number ${messageData.to}] ${messageData.from} : ${messageData.content}`)
    socket.broadcast.to(`${messageData.to}`).emit('update', JSON.stringify(messageData))
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
