import React from 'react';
import { HeaderPage } from '../HeaderPage/index'
import { Auth } from '../Auth';
import './index.css';

export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            user: null,
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

        site.push(<HeaderPage key="HeaderPage" links={this.state.links} onClick={(i) => this.handleHeaderClick(i)}/>)
        if (this.state.page === 3)
            site.push(<Auth key="SignIn" buttonValue="Sign In" onClick={(userInfo) => {this.handlerSignInClick(userInfo);}}/>)
        if (this.state.page === 4)
            site.push(<Auth key="SignUp" buttonValue="Sign Up" onClick={(userInfo) => {this.handlerSignUpClick(userInfo);}}/>)
        // if (this.state.page === 0) {
            // site.push(<Content />)
        // }k
        return (site);
        // <Gamkkлллkkлe />
        // <FooterPage />);

    }

    handleHeaderClick(i) {
        console.log(i);
        this.setState({page: i});
    }

    handlerSignInClick(userInfo) {
        console.log(userInfo);
        this.setState({page: 0, user: userInfo});
    }

    handlerSignUpClick(userInfo) {
        console.log(userInfo);
        this.setState({page: 0, user: userInfo});
    }
}