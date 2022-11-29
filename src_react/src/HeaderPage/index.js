import React from 'react';
import './index.css';
import auth from './auth.jpg';

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
            if ((indx === 3 || indx === 4) && this.props.user !== null)
                return [];
            return this.renderButton(value, indx);
        });
        if (this.props.user !== null)
            buttons.push(<button key="Exit" className='ImgButton' onClick={this.props.onClickExit}><img src={auth} alt='Picture'/></button>)

        return (
            <header>
                {buttons}
            </header>

        );
    }

}