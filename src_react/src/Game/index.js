import React from "react";
import board from './board.png';
import point from './point.png';
import './index.css';
import { requestGetEngineGet, requestGetUserGetId, requestPostUserLogin, requestPutEngineStart } from '../HTTPRequest';

function updateWindow() {

}

const sizeBoard = 1000;

export class Game extends React.Component {

    constructor(props) {
        // let request = JSON.stringify({'user1': 1, 'user2': 2}); //todo
        // let room_id = requestEngineCreateRoom(request)['room_id'];
        // console.log(room_id);
        super(props);
        console.log('userId', this.props.userId);
        const cRoomId = requestPutEngineStart(this.props.userId);
        let cAns;
        if (cRoomId !== null)
            cAns = requestGetEngineGet(cRoomId['room_id']);
        else {
            cAns = requestGetUserGetId(this.props.userId);
            if (cAns !== null)
                cAns = requestGetEngineGet(cAns['room']);
        }
        const userOne = cAns['user1'] !== undefined ? cAns['user1'] : 0;
        const userTwo = cAns['user2'] !== undefined ? cAns['user2'] : 0;
        const ball = cAns['ball'] !== undefined ? cAns['ball'] : 0;
        this.state = {
            roomId: cRoomId['room_id'],
            top0: userOne,
            top1: userTwo,
            ball: ball
        };
        this.userFlag = this.state.topOne['id'] === this.props.userId ? 0 : 1;
        setInterval(() => {this.updateUser()}, 100);
        this.keyDownHandler = (event) => {
            console.log(event.code);
            let res = 0;
            if (event.code === "ArrowUp")
                res += 0.01;
            if (event.code === "ArrowDown")
                res -= 0.01;
            const json = JSON.stringify({'position': this.state['top' + this.userFlag]});
            requestPostEngineMoveId(json);
            this.forceUpdate();
        };
    }

    updateUser() {
        const cAns = requestGetEngineGet(this.state.roomId);
        console.log('Engine update');
        if (cAns['user1']['id'] === this.props.userId)
            this.setState({topTwo: cAns['user2']});
        else
            this.setState({topOne: cAns['user1']});
        this.setState({'ball': cAns['ball']});
        this.forceUpdate();
    }

    render() {
        if (this.state.roomId === null) {
            alert(`Че? Дохуя умный что ли?`);
            return ;
        }
        //todo
        const one = this.userFlag === 0 ? this.keyDownHandler: null;
        const two = this.userFlag === 1 ? this.keyDownHandler: null;
        return (
        <div>
            <h2>Game</h2>
            <div className="placeForGame">
                <img onKeyDown={one} style={{top: 100 + this.state.topOne['board_position'] * 1000}} className=" board playerOne" src={board} alt='playerOne'/>
                <img style={{top: 100 + this.state.ball['posx'] * 900, left: 100 + this.state.ball['posy'] * 900}} className=" point" src={point} alt='point'/>
                <img onKeyDown={two} style={{top: 100 + this.state.topTwo['board_position'] * 1000}} className=" board playerTwo" src={board} alt='playerTwo'/>
            </div>
        </div>);
    } 

    keyDownHandler
} 