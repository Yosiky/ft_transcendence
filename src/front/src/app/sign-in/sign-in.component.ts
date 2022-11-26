import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
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
        private location: Location,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void { }

    signIn(): void {
        if (this.user.login.trim() !== '')
            this.userService.authorization(this.user).subscribe(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
