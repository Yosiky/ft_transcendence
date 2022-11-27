import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, ACCOUNT } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
    user: User = new User('', '');

    constructor(
        private userService: UserService,
        private router: Router 
    ) { }

    ngOnInit(): void { }

    signIn(): void {
        if (this.user.userName.trim() !== '' && this.user.password.trim() !== '')
            this.userService.authorization(this.user);
            // .subscribe((ans) => {
            //     ACCOUNT.userName = this.user.userName;
            //     ACCOUNT.password = this.user.password;
            //     ACCOUNT.id = ans;
            //     this.goMainPage();
            // });
    }

    goMainPage(): void {
        this.router.navigateByUrl('/main');
    }
}
