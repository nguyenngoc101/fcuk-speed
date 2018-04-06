import React from 'react';
import './Chatroom.css'
import avatar from '../../avatar.jpg';


class Chatroom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "online_users": [
                {
                    "name": "vunv"
                },
                {
                    "name": "trungnv"
                },
                {
                    "name": "long"
                },
                {
                    "name": "hung"
                },
                {
                    "name": "ngocnv"
                },
            ],
            "messages": [
                {
                    "type": "CHAT",
                    "from": "vu",
                    "msg": "Hi, everyone!",
                    "at": "12:34"
                },
                {
                    "type": "CHAT",
                    "from": "trungnv",
                    "msg": "How are you, guys?",
                    "at": "13:34"
                },
                {
                    "type": "CHAT",
                    "from": "long",
                    "msg": "Still fine",
                    "at": "13:50"
                },
                {
                    "type": "LEAVE",
                    "from": "hung"
                },
                {
                    "type": "JOIN",
                    "from": "ngocnv"
                }
            ]
        }

    }


    render() {
        return (
            <div id="wrapper" className="container">
                <div className="row">
                    <SideBar users={this.state.online_users}/>
                    <ChatContent messages={this.state.messages}/>
                </div>
            </div>
        )
    }
}

class SideBar extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        const listItems = this.props.users.map((user, i) => <li key={i}><span>{user.name}</span></li>);
        return (
            <nav id="sidebar" className="col-3">
                <div className="sidebar-header">
                    <h5>Online Users</h5>
                </div>
                <ul className="list-unstyled">
                    {listItems}
                </ul>
            </nav>
        )
    }
}

class ChatContent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="content" className="col-9">
                <MessageBox messages={this.props.messages}/>
                <ChatBox/>
            </div>
        )
    }
}

class MessageBox extends React.Component {

    constructor(props) {
        super(props);
        this.currentUser = "ngocnv";
    }

    render() {
        const listItems = this.props.messages.map((message, i) =>
            <ChatMessage key={i} message={message}/>
        );


        return (
            <div id="message-box">
                {listItems}
            </div>
        )
    }
}

class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructor...")
    }

    render() {

        return (
            <div className="row">
                <div className="avatar col-md-1">
                    <img src={avatar}></img>
                </div>
                <div className="chat-text col-md-11">
                    <p className="text-left">{this.props.message.from+", " + this.props.message.at}</p>
                    <p className="text-right">{this.props.message.msg}</p>
                </div>
            </div>
        )
    }
}

class LeftMessage extends React.Component {
    render() {
        return (
            <div className="chat-text col-md-11">
                <p className="text-left">{this.getLeftMessage}</p>
            </div>
        )
    }

    getLeftMessage() {
        return this.props.message.from + " just left."
    }
}

class JoinMessage extends React.Component {
    render() {
        return (
            <div className="chat-text col-md-11">
                <p className="text-left">{this.props.message.from}</p>
            </div>
        )
    }

    getJoinMessage() {
        return this.props.message.from + " just joined."
    }
}

class ChatBox extends React.Component {
    render() {
        return (
            <div id="chat-box" className="row">
            <input type="text" className="col-11"/>
            <input type="button" value="Send" className="col-1 btn btn-primary"/>
        </div>
        )
    }
}

export default Chatroom;