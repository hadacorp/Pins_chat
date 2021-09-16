# Pins_chat
Pins 채팅 서버

## Introduction
> <img alt="node.js" src ="https://img.shields.io/badge/Node.js-339933.svg?&style=flat&logo=Node.js&logoColor=white"/>
> <img alt="Socket.io" src ="https://img.shields.io/badge/Socket.io-010101.svg?&style=flat&logo=Socket.io&logoColor=white"/>
> <img alt="MySQL" src ="https://img.shields.io/badge/MySQL-4479A1.svg?&style=flat&logo=MySQL&logoColor=white"/>
> <img alt="Amazon AWS" src ="https://img.shields.io/badge/AWS-232F3E.svg?&style=flat&logo=Amazon-AWS&logoColor=white"/>

## chat type
* enter 참가 
* left 이탈
* message 메시지 전송
* image 이미지 전송
* pin 핀 전송

## 채팅 시나리오

* 채팅방 참가자가 아닌 사람이 채팅방 참가 요청시  -> 채팅방 관리자 수락 -> enter 수행 -> 채팅방 정보(or 핀)에 참가 유저 정보 저장 : (채팅방 소켓 연결이 끊기거나 채팅방 기록을 가져오기 위해 )

* 채팅방 참가자일때 
    + 클라이언트 백그라운드 유지시 
        - 정상적으로 message 수신후 클라이언트 저장 및 알림 
    + 클라이언트 백그라운드 끊겼을때 (네트워크를 끊고 있거나 전원이 꺼져 있을때)
        - 클라이언트 저장 message 내용과 서버 message 내용을 비교하여 메세지 알림

* 앱에 접속 할때 서버 7일간 저장 채팅 내역과 클라 저장 채팅 내역을 비교 해야댐 <- 어떻게 비교할지는 아직 모름

* 이미지 전송 방식
    1. 먼저 서버에 post로 이미지 저장 시도 
    2. 성공시 해당 이미지 url을 image 타입으로 전송 (해당 이미지를 저장 기간을 설정하고 기간 만료시 처리 필요)



## 채팅 저장 정보 테이블 구조  

|Column|Datatype|Explanation|
|------|---|---|
|id|BIGINT|채팅 메시지-id|
|uuid|VARCHAR|채팅방 고유 uuid|
|type|VARCHAR|채팅 타입|
|send_user|BIGINT|전송 유저 db_id|
|data|VARCHAR|전송 메시지 or image url or 입장 퇴장 알림 메시지|
|date|DATETIME|메시지 시간|




## 이슈

* 클라이언트를 백그라운드로 계속 유지 해야 하는가? => 백그라운드 유지시 클라이언트의 소모되는 배터리 및 메모리 多
* 만약 백그라운드로 유지하지 않을때 소켓을 언제 열고 닫을것인가?? + 언제 메시지 데이터를 가져올 것인가? => 메시지 알림 불가,,
* 서버에 메시지 저장시 저장 기간은?  => 서버에 메시지 몽땅 저장시 서버 자원 소모 多