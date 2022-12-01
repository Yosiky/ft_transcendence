let apiUserAdd = '/api/user/add';
let apiUserGetAll= '/api/user/get/all';
let apiEngineCreateRoom = '/api/engine/create_room'
let url = 'https://246d-46-39-51-194.eu.ngrok.io';

export function requestPostUserAdd(userJson) {
    let req = new XMLHttpRequest();

    req.onload = () => {
        if (req.status !== 200)
            alert('Error: ' + req.status);
        console.log(req.response);
        return ;
    };
    req.onerror = () => { alert('Error connecting'); };
    req.open('POST', url + apiUserAdd);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send(userJson);
}

export function requestGetUserGetAll() {
    let req = new XMLHttpRequest();

    req.onload = () => {
        if (req.status !== 200)
            alert('Error: ' + req.status);
        return ;
    };
    req.onerror = () => { alert('Error connecting'); };
    req.open('GET', url + apiUserGetAll, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send();
    return req.response;
}

export function requestEngineCreateRoom() {
    let req = new XMLHttpRequest();

    req.onload = () => {
        if (req.status !== 200)
            alert('Error: ' + req.status);
        return ;
    };
    req.onerror = () => { alert('Error connecting'); };
    req.open('GET', url + apiEngineCreateRoom, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send();
}