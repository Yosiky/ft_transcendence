import React from 'react';
import './index.css';

export class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorLogin: '',
            errorPassword: '',
            login: "",
            password: ""
        }
    }

    handleLoginChange(event) {
        this.setState({login: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div>
                <label className={this.state.errorLogin}>Login</label>
                <input type='text' value={this.state.login} onChange={(event) => this.handleLoginChange(event)}/>
                <label className={this.state.errorPassword}>Password</label>
                <input type='password' value={this.state.password} onChange={(event) => this.handlePasswordChange(event)}/>
                <button onClick={() => this.auth()} >{this.props.buttonValue}</button>
            </div>
        );
    }

    retry(info) {
        if (info[0] === '')
            this.setState({errorLogin: "error"});
        else
            this.setState({errorLogin: ""});
        if (info[1] === '')
            this.setState({errorPassword: "error"});
        else
            this.setState({errorPassword: ""});
    }

    auth() {
        const userInfo = [this.state.login.trim(), this.state.password.trim()];
        if (userInfo[0] === '' || userInfo[1] === '')
            return this.retry(userInfo);
        console.log("userInfo: ");
        console.log(userInfo);
        this.props.onClick(userInfo);
    }
}