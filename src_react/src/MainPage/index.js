import React from 'react';
import { Main } from '../Main';
import { ScoreTable } from '../ScoreTable';
import { HeaderPage } from '../HeaderPage/index'
import { Auth } from '../Auth';
import './index.css';
import { requestAddUser } from '../HTTPRequest';

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
            site.push(<Main />);
        // if (this.state.page === 1)
            // site.push(<Chat />);
        if (this.state.page === 2)
            site.push(<ScoreTable key="ScoreBoard" user={this.state.user} users={this.state.scoreBoard} />);
        if (this.state.page === 3)
            site.push(<Auth key="SignIn" buttonValue="Sign In" onClick={(userInfo) => {this.handlerSignInClick(userInfo);}}/>)
        if (this.state.page === 4)
            site.push(<Auth key="SignUp" buttonValue="Sign Up" onClick={(userInfo) => {this.handlerSignUpClick(userInfo);}}/>)
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

    handlerSignInClick(userInfo) {
        this.setState({page: 0})
        this.setState({user: userInfo});
        console.log(this.state.user);
    }

    handlerSignUpClick(userInfo) {
        this.setState({page: 0})
        this.setState({user: userInfo});
        console.log(this.state.user);
        requestAddUser();
    }
}