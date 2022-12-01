import React from "react";
import { requestEngineCreateRoom } from "../HTTPRequest";


export class Game extends React.Component {

    constructor(props) {
        // let request = JSON.stringify({'user1': 1, 'user2': 2}); //todo
        // let room_id = requestEngineCreateRoom(request)['room_id'];
        // console.log(room_id);
        super(props);
        this.state = {
            // todo user1id
            // todo user2id
            // roomId: room_id,
        };
    }

    render() {
        return (
        <div>
            <h2>Game</h2>
            <canvas id="tutorial" width="150" height="150"></canvas>
        </div>);
    } 
} 