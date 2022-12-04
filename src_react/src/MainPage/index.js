import React from 'react';
import { Main } from '../Main';
import { ScoreTable } from '../ScoreTable';
import { HeaderPage } from '../HeaderPage/index'
import { Game } from '../Game';
import { Auth } from '../Auth';
import './index.css';
import { requestDeleteEngineExitRoom, requestGetUserGetAll, requestPutUserAdd, requestPostUserLogin, requestGetUserGetId } from '../HTTPRequest';
import { exitRoom } from '../Game';

export class MainPage extends React.Component {
    constructor(userId, userName, scoreBoard, props) {
        super(props);
        this.getUserName = () => { return this.userName; };
        this.getScoreBoard = () => { return this.scoreBoard; };
        this.state = {
            page: 0,
            userName: 'none',
            userId: null,
            scoreBoard: null,
            links: {
                main: 'Main Page',
                chat: 'Chat',
                scoreTable: 'Score Table',
                signIn: 'Sign In',
                signUp: 'Sign Up'
            }
        };
    }

    render() {
        let site = [];

        site.push(<HeaderPage key="HeaderPage" userId={this.state.userId} links={this.state.links} onClick={(i) => this.handleHeaderClick(i)} onClickExit={() => this.handleExitClick()}/>)
        if (this.state.page === 0)
            site.push(<Main onClick={() => { this.handleMainClick(); }} />);
        // if (this.state.page === 1)
            // site.push(<Chat />);
        if (this.state.page === 2)
            site.push(<ScoreTable key="ScoreBoard" user={this.state.userName} scoreBoard={this.state.scoreBoard} />);
        if (this.state.page === 3)
            site.push(<Auth key="SignIn" buttonValue="Sign In" onClick={(userInfo) => {this.handleSignInClick(userInfo);}}/>)
        if (this.state.page === 4)
            site.push(<Auth key="SignUp" buttonValue="Sign Up" onClick={(userInfo) => {this.handleSignUpClick(userInfo);}}/>)
        if (this.state.page === 5)
            site.push(<Game key="Game" userId={this.state.userId} exit={this.exit={}}/>)
        // if (this.state.page === 0) {
            // site.push(<Content />)
        // }
        return (site);
        // <Gamkkлллkkлe />
        // <FooterPage />);

    }

    handleExitClick() {
        this.setState({page: 0});
        this.forceUpdate();
        requestDeleteEngineExitRoom(this.state.userId);
        this.setState({userId: null});
        this.setState({userName: 'none'});
        if (exitRoom !== null) {
            clearInterval(exitRoom[0]);
            clearInterval(exitRoom[1]);
        }
    }

    handleHeaderClick(i) {
        if (exitRoom !== null) {
            clearInterval(exitRoom[0]);
            clearInterval(exitRoom[1]);
        }
        console.log(i);
        if (i == 2)
            this.setState({scoreBoard: this.updateScoreBoard()});
        this.setState({page: i});
    }

    handleSignInClick(userInfo) {
        this.setState({page: 0});
        this.setState({userName: userInfo[0]});
        let res = JSON.stringify({'username': userInfo[0], 'password_hash': userInfo[1]});
        let ans = requestPostUserLogin(res);

        if (ans !== null)
            this.setState({userId: ans['id']});
    }

    handleSignUpClick(userInfo) {
        this.setState({page: 0});
        // this.userName = userInfo[0];
        this.setState({userName: userInfo[0]});
        let res = JSON.stringify({'username': userInfo[0], 'password_hash': userInfo[1]});
        let ans = requestPutUserAdd(res);

        if (ans !== null)
            // this.userId =ans['id'];
            this.setState({userId: ans['id']});
    }

    handleMainClick() {
        if (this.state.user !== null)
            this.setState({page: 5});
        else
            alert(`You don't in account`);
    }

    updateScoreBoard() {
        return (requestGetUserGetAll());
    }

    exit() {
        this.handleHeaderClick(0);
    }
}