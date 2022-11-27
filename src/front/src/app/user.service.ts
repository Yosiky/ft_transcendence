import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import fetch from '../../node_modules/node-fetch';


import { User } from './user';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private start_url: string = "https://940c-213-87-151-8.eu.ngrok.io/";
    private signInUser: string = "api/user/check";
    private signUpUser: string = "api/user/add";
    private getUserId: string = "api/user/get";

    constructor(
        private http: HttpClient,
    ) { }

    log(str: string): void {

    }

    private handleError<T>(operation = 'operation', result?: T){
        return (error: any): Observable<T> => {
            console.log(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    getUrl(url:string, userName: string): string {
        return `$(start_url)$(url)$(userName)`;
    }


    authorization(user: User): string {
        const encrypted_password: string = user.encrypted_password();
        const url: string = this.getUrl(this.signInUser, user.userName);
        const data: string = JSON.stringify({
            username: user.userName,
            password_hash: encrypted_password,
          });
        return url;
    }

    register(user: User): Observable<string> {
        const encrypted_password: string = user.encrypted_password();
        const url: string = this.getUrl(this.signUpUser, user.userName);
        const data: JSON = <JSON><unknown>{
            "username": user.userName,
            "password": encrypted_password 
        };
        return this.http.post<string>(url, data, this.httpOptions).pipe(
            tap(_ => this.log(`fetched user userName = ${user.userName}`)),
            catchError(this.handleError<string>(`getUser = ${user.userName}`))
        );
    }
}
