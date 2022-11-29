import React from "react";
import './index.css';
import game from './GameLogo.png';

export class Main extends React.Component {

    render() {

        return (
            <div className="Main">
                <img src={game} alt="GameLogo"/>
                <button >Start</button>
                
            </div>
        );

    }
}