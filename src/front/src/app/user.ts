interface IUser {
    login: string;
    password: string;
}

export class User implements IUser {
    login: string;
    password: string;

    constructor(userLogin: string, userPassword: string) {
        this.login = userLogin;
        this.password = userPassword;
    }

    encrypted_password(): any {
        return btoa(this.password);
    }
}