import React from "react";
import './index.css';

export class ScoreTable extends React.Component {

    render() {
        console.log(this.props.users);
        const result = this.props.users.map((value, indx) => {
            return (<span key={indx}>{indx} {value[0]} {value[1]}</span>);
        }); 
        const user = this.props.user === null ? 
        (<span key={-1}>- You 0</span>)
        : (<span key={-1}>- {this.props.user} {0}</span>);
        return (
            <div >
                <p>Score Table</p>
                <div className="Score">{result}
                {user}
                </div>
            </div>
        );
    }
}