interface IUser {
    id: string;
    userName: string;
    password: string;
}

export class User implements IUser {
    id: string = '';
    userName: string;
    password: string;

    constructor(inUserName: string, inUserPassword: string) {
        this.userName = inUserName;
        this.password = inUserPassword;
    }

    encrypted_password(): any {
        return btoa(this.password);
    }
}

export var ACCOUNT: User = new User('', '');