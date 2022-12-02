import React from "react";
import { requestGetUserGetAll } from "../HTTPRequest";
import './index.css';

export class ScoreTable extends React.Component {

    constructor(props) {
        super(props);

    }

    someFunc() {
        return this.props.users();
    }

    render() {
        console.log('start score board');
        console.log('user', this.props.user);
        const result = this.someFunc().map((value, indx) => {
            return (<span key={indx}>{indx} {value['username'].trim()} {0}</span>);
        }); 
        const user = this.props.user === null ? 
        (<span key={-1}>- You 0</span>)
        : (<span key={-1}>- {this.props.user} {0}</span>);
        return (
            <div >
                <p>Score Table</p>
                <div className="Score">{result}
                {user}
                {/* {response} */}
                </div>
            </div>
        );
    }
}