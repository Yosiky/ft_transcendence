import React from 'react';
import './index.css';

function HeaderButton(props) {
    return (
        <button onClick={props.onClick}>{props.value}</button>
    );

}

export class HeaderPage extends React.Component {

    renderButton(name, indx) {
        return (
            <HeaderButton key={indx} indx={indx} value={name}
                onClick={() => this.props.onClick(indx)} />
        );
    }

    render() {
        const names = Object.values(this.props.links);
        const buttons = names.map((value, indx) => {
            return this.renderButton(value, indx);
        })
        return (
            <header>
                {buttons}
            </header>

        );
    }

}