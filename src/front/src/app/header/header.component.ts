import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ACCOUNT, User } from '../user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    user?: User;
    pages: string[] = ["main", "sign-in", "sign-up"];
    href: string = "";
    @Input() page_href: string = "";

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log('OnInit');
        this.user = ACCOUNT;
        if (this.user.id === undefined)
            this.user.id = '';
        console.log(this.user);
        this.href = this.router.url;
        console.log(this.href);
    }
}
