import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from './user';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private signInUser: string = "api/user/get/signIn";
    private signUpUser: string = "api/user/get/signUp";
    //private signUpUser: string = "api/user/get/signUp";

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


    authorization(user: User): Observable<User> {
        const encrypted_password: string = user.encrypted_password();
        const url: string = `${this.signInUser}/${user.login}`;
        return this.http.post<User>(url, encrypted_password, this.httpOptions).pipe(
            tap(_ => this.log(`fetched user login = ${user.login}`)),
            catchError(this.handleError<User>(`getUser = ${user.login}`))
        );
    }
}
