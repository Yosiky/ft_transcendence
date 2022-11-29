import React from 'react';
import './index.css';
import logo from './images.png';

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
            <div className='Auth'>
                <img src={logo} alt="Logo"/>
                <label className={this.state.errorLogin}>Login:
                <input type='text' value={this.state.login} onChange={(event) => this.handleLoginChange(event)}/></label>
                <label className={this.state.errorPassword}>Password:
                <input type='password' value={this.state.password} onChange={(event) => this.handlePasswordChange(event)}/></label>
                <button  onClick={() => this.auth()} >{this.props.buttonValue}</button>
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
        this.props.onClick(userInfo);
    }
}