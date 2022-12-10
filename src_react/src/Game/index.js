import React from "react";
import board from './board.png';
import point from './point.png';
import './index.css';
import { requestGetEngineGet, requestGetUserGetId, requestPostUserLogin, requestPutEngineStart, requestPostEngineMoveId} from '../HTTPRequest';
// import photo_loading from './loading-1.webp';

const sizeBoard = 1000;

let flagStartGame = false;
let writeInArray = false;
export var exitRoom = null;
export var error = null;

export class Game extends React.Component {

    constructor(props) {
        // let request = JSON.stringify({'user1': 1, 'user2': 2}); //todo
        // let room_id = requestEngineCreateRoom(request)['room_id'];
        // console.log(room_id);
        exitRoom = null;
        super(props);
        this.state = {
            roomId: null,
            topOne: null,
            topTwo: null,
            ball: null
            // ball: {'posx': 450,
            //         'posy': 450}, 
        };
        this.array = {
            ballx: 0.5,
            bally: 0.5,
            pos1: 450,
            pos2: 450,
            speedx: 0.02,
            speedy: 0.01,
            score1: 0,
            score2: 0,
            BOARD_SIZE: 0
        };
        this.scores = [0, 0];
        this.userFlag = 0;
        exitRoom = [
            setInterval(() => {this.updateUser()}, 200),
            setInterval(() => {this.updateBall()}, 25)
        ];
        this.keyDownHandler = (event) => {
            console.log(event.code);
            let res = 0;
            if (event.code === "ArrowUp")
                res += 0.1;
            if (event.code === "ArrowDown")
                res -= 0.1;
            const json = JSON.stringify({'position': this.state['top' + this.userFlag]});
            requestPostEngineMoveId(json);
            this.forceUpdate();
        };
    }

    updateBall() {
        if (!flagStartGame || writeInArray)
            return ;
        this.array = updateRoomSingle(this.array);
        this.state['ball'] = {
            posx: this.array['ballx'],
            posy: this.array['bally']};
        this.forceUpdate();
    }

    initGame() {
        let answer;
        let cRoomId = requestPutEngineStart(this.props.userId);

        console.log('userId', this.props.userId);
        console.log('cRoomId', cRoomId);
        if (cRoomId === null) {
            answer = requestGetUserGetId(this.props.userId);
            if (answer !== null && answer['room'] >= 0) {
                cRoomId = answer['room'];
                answer = requestGetEngineGet(cRoomId);
            }
        }
        else
            answer = requestGetEngineGet(cRoomId['room_id']);
        if (answer === null)
            alert('Error');
        const user1 = answer['user1'];
        const user2 = answer['user2'];
        const ball = answer['ball'];
        this.state['roomId'] = cRoomId['room_id'];
        this.state['topOne'] = user1;
        this.state['topTwo'] = user2;
        // this.array['ballx'] = ball['posx'];
        // this.array['bally'] = ball['posy'];
        // this.setState({roomId: cRoomId['room_id']});
        // this.setState({topOne: user1});
        // this.setState({topTwo: user2});
        // this.setState({ball: ball});
        this.userFlag = user1['id'] === this.props.userId ? 0 : 1;
    }

    updateUser() {
        if (!flagStartGame) {
            this.initGame();
            flagStartGame = true;
        }
        const cAns = requestGetEngineGet(this.state.roomId);
        console.log(cAns);
        if (cAns === null)
            this.props.exit();
        console.log('Engine update');
        if (cAns['user1']['id'] === this.props.userId) {
            this.state['topOne'] = cAns['user1'];
            this.state['topTwo'] = cAns['user2'];
            // this.setState({topTwo: cAns['user2']});
        }
        else {
            this.state['topOne'] = cAns['user2'];
            this.state['topTwo'] = cAns['user1'];
        }
        writeInArray = true;
        this.scores[0] = cAns['user1']['score'];
        this.scores[1] = cAns['user2']['score'];
        this.array['ballx'] = cAns['ball']['posx'];
        this.array['bally'] = cAns['ball']['posy'];
        this.array['speedx'] = cAns['ball']['speedx'];
        this.array['speedy'] = cAns['ball']['speedy'];
        writeInArray = false;
        // this.setState({topOne: cAns['user1']});
        // this.state['ball'] = cAns['ball'];
        // this.setState({'ball': cAns['ball']});
        this.forceUpdate();
    }

    render() {
        if (this.state.ball === null)
            return (<div className="photo_load"><img src='https://i.gifer.com/XOsX.gif' alt='error'/></div>);
        const one = this.userFlag === 0 ? this.keyDownHandler: null;
        const two = this.userFlag === 1 ? this.keyDownHandler: null;
        return (
        <div>
            <h1 className="game">Game {this.scores[0]}::{this.scores[1]}</h1>
            
            <div className="placeForGame">
                {/* <img onKeyDown={one} style={{top: 100 + this.state.topOne['board_position'] * 1000}} className=" board playerOne" src={board} alt='playerOne'/> */}
                <div style={{top: 125 + this.state.ball['posx'] * 995, left: 450 + this.state.ball['posy'] * 995}} className=" point" src={point} alt='point'> </div>
                {/* <img onKeyDown={two} style={{top: 100 + this.state.topTwo['board_position'] * 1000}} className=" board playerTwo" src={board} alt='playerTwo'/> */}
            </div>
        </div>);
    } 

    keyDownHandler
} 


// type RoomState = {
//     ballx: 0,
//     bally: 0,
//     pos1: 0,
//     pos2: 0,
//     speedx: 0,
//     speedy: 0,
//     score1: 0,
//     score2: 0,
//     BOARD_SIZE: 0
// };

function rand(start, end) {
    return Math.random() * (end - start) + start;
};

function resetRoom() {
    let sx = rand(0.05, 0.1);
    return [
        0.5,
        rand(0.2, 0.8),
        sx,
        0.2 - sx
    ];
};

function updateRoomSingle(room)
{
    let x = room.ballx + room.speedx;
    let y = room.bally + room.speedy;
    let sx = room.speedx;
    let sy = room.speedy;
    let score1 = room.score1;
    let score2 = room.score2;
    if (y > 1) {
        y = 2 - y;
        sy = -sy;
    } else if (y < 0) {
        y = -y;
        sy = -sy
    }
    if (x > 1) {
        if (Math.abs(room.pos1 - y) < room.BOARD_SIZE) {
            ++score1;
            [x, y, sx, sy] = resetRoom();
        } else {
            x = 2 - x;
            sx = -sx;
        }
    } else if (x < 0) {
        if (Math.abs(room.pos2 - y) < room.BOARD_SIZE) {
            ++score2;
            [x, y, sx, sy] = resetRoom();
        } else {
            x = -x;
            sx = -sx;
        }
    }
    /* console.log(x.toFixed(2),
                y.toFixed(2),
                sx.toFixed(2),
                sy.toFixed(2),
                room.pos1.toFixed(2),
                room.pos2.toFixed(2),
                score1,
                score2); */
    room.ballx = x;
    room.bally = y;
    room.speedx = sx;
    room.speedy = sy;
    room.score1 = score1;
    room.score2 = score2;
    return room;
}