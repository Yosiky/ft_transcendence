let apiUserAdd = '/api/user/add';
let apiUserLogin = '/api/user/login';
let apiUserGetId = '/api/user/get/id/';
let apiUserGetName = '/api/user/get/name/';
let apiUserGetAll= '/api/user/get/all';
let apiUserDelete = '/api/user/delete/';
let apiEngineStart = '/api/engine/start/'
let apiEngineCreateRoom = '/api/engine/create_room';
let apiEngineGet = '/api/engine/get/';
let apiEngineMove = '/api/engine/move/';
let apiEngineExitRoom = '/api/engine/exit_room/';
let url = 'https://5adc-46-39-51-253.eu.ngrok.io';

export function requestPutUserAdd(userJson) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('PUT', url + apiUserAdd, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send(userJson);
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    alert('Error: ' + ans['message']);
    return null;
}

export function requestPostUserLogin(userJson) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('POST', url + apiUserLogin, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send(userJson);
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    alert('Error: ' + ans['message']);
    return null;
}

export function requestGetUserGetId(id) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('GET', url + apiUserGetId + id, false);
    req.send();
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    alert('Error: ' + ans['message']);
}

export function requestGetUserGetName(name) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('GET', url + apiUserGetName + name, false);
    req.send();
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    alert('Error: ' + ans['message']);
    return null;
}

export function requestGetUserGetAll() {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('GET', url + apiUserGetAll, false);
    req.send();
    ans = JSON.parse(req.response);
    console.log('ans = ', ans);
    console.log('json = ', req.response);
    if (req.status === 200)
        return ans;
    alert('Error: ' + ans['message']);
    return null;
}

export function requestDeleteUserDelete() {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('DELETE', url + apiUserDelete);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send();
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    alert('Error: ' + ans['message']);
    return null;
}

export function requestPutEngineStart(userId) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('PUT', url + apiEngineStart + userId, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send();
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    return null;
}

export function requestPutEngineCreateRoom(usersInfo) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('PUT', url + apiEngineCreateRoom, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send(usersInfo);
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    alert('Error: ' + ans['message']);
    return null;
}

export function requestGetEngineGet(roomId) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('GET', url + apiEngineGet + roomId, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send();
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    return null;
}

export function requestPostEngineMoveId(id, json) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('POST', url + apiEngineMove + id, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send(json);
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    //alert('Error: ' + ans['message']);
    return null;
}

export function requestDeleteEngineExitRoom(userId) {
    let req = new XMLHttpRequest();
    let ans;

    req.onerror = () => { alert('Error connecting'); };
    req.open('DELETE', url + apiEngineExitRoom + userId, false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send();
    ans = JSON.parse(req.response);
    if (req.status === 200)
        return ans;
    return null;
}