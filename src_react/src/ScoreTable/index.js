import React from "react";
import './index.css';

export class ScoreTable extends React.Component {

    render() {
        let xhr = new XMLHttpRequest();
        let url = 'https://a45c-46-39-51-194.eu.ngrok.io/api/user/get/all';
        xhr.withCredentials = true;
        xhr.open("GET", url, [false, null , null]);
        xhr.send();
        xhr.onload = function() {
            if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else { 
                alert('OK');
                
                // если всё прошло гладко, выводим результат alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
            }
          };
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