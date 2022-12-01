let get_req = new XMLHttpRequest();
let post_req = new XMLHttpRequest();
let put_req = new XMLHttpRequest();
let url = 'https://a45c-46-39-51-194.eu.ngrok.io/api/user/get/all';

export function requestAddUser(userJson) {
    let req = new XMLHttpRequest();
    req.open('POST', url);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.responseType = 'json';
    req.opload = () => {
        if (req.status !== 200)
            alert('Error: ' + req.status);
        return ;
    };
    req.onerror = () => { alert('Error connecting'); };
    req.onprogress = (event) => {
        if (event.lengthComputable) {
            alert(`Получено ${event.loaded} из ${event.total} байт`);
        } else {
            alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
        }
    }
    req.timeout = 10000;
    req.send(userJson);
}