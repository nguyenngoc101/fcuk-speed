import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import registerServiceWorker from './registerServiceWorker';
import $ from "jquery";
import Chatroom from "./Chatroom";
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


var socket = new SockJS('http://localhost:8080/ws');
var stompClient = Stomp.over(socket);

stompClient.connect({}, onConnected, onError);

function onConnected() {
    console.log("connected to socket server");
    console.log(socket._transport.url + " ");
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);
}

function onMessageReceived(payload) {
    console.log("toi dang nhan du lieu");
    let message = JSON.parse(payload.body);
    console.log("message nhan duoc: "+ JSON.stringify(message));
    //{"type":"JOIN","content":null,"sender":"afa"} 

    if (message.type === "JOIN") {
        $("#message-box ul li div.row").append(joinMessage(message.sender, getCurrentTime()))
    }
}


function joinMessage(sender, time) {
    let joinEle = "<div class=\"chat-text col-md-11\">\n" +
        "        <p class=\"text-left\">{0}, joined {1}</p>\n" +
        "    </div>";
    return joinEle.format(sender, time);
}

function getCurrentTime() {
    let currentDate = new Date();
    return currentDate.getHours() + ":" + currentDate.getMinutes();
}

function onError() {
    console.log("Error happened.");
}


$(function () {
    init();
    $(".login-form a").click(function () {
        let username = $(":text").val();
        // Tell your username to the server
        stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
        )
        ReactDOM.render(<Chatroom />, document.getElementById('root'));
    });



})

function init() {
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] !== 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        };
    }
}