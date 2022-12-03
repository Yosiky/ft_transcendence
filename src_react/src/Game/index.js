import React from "react";
import board from './board.png';
import point from './point.png';
import './index.css';

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
            <div className="placeForGame">
                <img className="board playerOne" src={board} alt='playerOne'/>
                <img className="point" src={point} alt='point'/>
                <img className="board playerTwo" src={board} alt='playerTwo'/>
            </div>
        </div>);
    } 
} 