import React from 'react';
import { Main } from '../Main';
import { ScoreTable } from '../ScoreTable';
import { HeaderPage } from '../HeaderPage/index'
import { Game } from '../Game';
import { Auth } from '../Auth';
import './index.css';
import { requestGetUserGetAll, requestPostUserAdd } from '../HTTPRequest';

export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            user: null,
            scoreBoard: [
                ['eestelle', 1000],
                ['tlucanti', 800],
                ['ntitan', 700],
                ['aregenia', 500],
            ],
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

        site.push(<HeaderPage key="HeaderPage" user={this.state.user} links={this.state.links} onClick={(i) => this.handleHeaderClick(i)} onClickExit={() => this.handleExitClick()}/>)
        if (this.state.page === 0)
            site.push(<Main onClick={() => { this.handleMainClick(); }} />);
        // if (this.state.page === 1)
            // site.push(<Chat />);
        if (this.state.page === 2)
            site.push(<ScoreTable key="ScoreBoard" user={this.getScoarBoard()} users={this.state.scoreBoard} />);
        if (this.state.page === 3)
            site.push(<Auth key="SignIn" buttonValue="Sign In" onClick={(userInfo) => {this.handleSignInClick(userInfo);}}/>)
        if (this.state.page === 4)
            site.push(<Auth key="SignUp" buttonValue="Sign Up" onClick={(userInfo) => {this.handleSignUpClick(userInfo);}}/>)
        if (this.state.page === 5)
            site.push(<Game key="Game"  />)
        // if (this.state.page === 0) {
            // site.push(<Content />)
        // }
        return (site);
        // <Gamkkлллkkлe />
        // <FooterPage />);

    }

    handleExitClick() {
        this.setState({user: null});
        this.setState({page: 0});
    }

    handleHeaderClick(i) {
        console.log(i);
        this.setState({page: i});
    }

    handleSignInClick(userInfo) {
        this.setState({page: 0})
        console.log('main', userInfo);
        this.setState({user: userInfo[0]});
        console.log('main', this.state.user);
    }

    handleSignUpClick(userInfo) {
        this.setState({page: 0})
        let res = JSON.stringify({
            'username': userInfo[0], 'password_hash': userInfo[1]});
        requestPostUserAdd(res);
    }

    handleMainClick() {
        if (this.state.user !== null)
            this.setState({page: 5});
        else
            alert(`You don't in account`);
    }

    updateScoreBoard() {
        const response = requestGetUserGetAll();
        console.log('respose user/get/all');
        console.log(response);
        this.setState({scoreBoard: response});
    }
    
    getScoarBoard() {
        this.updateScoreBoard();
        return (this.state.scoreBoard);
    }

}