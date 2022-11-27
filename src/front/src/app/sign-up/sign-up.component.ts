import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, ACCOUNT } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
	user: User = new User('', '');
	repeat_password: string = "";

	constructor(
		private userService: UserService,
		private router: Router
	) {
	}

	signUp(): void {
        if (this.user.userName.trim() !== '' 
			&& this.user.password.trim() !== '')
			if (this.user.password.trim() === this.repeat_password)
				this.userService.register(this.user).subscribe((ans) => {
					ACCOUNT.password = this.user.password;
					ACCOUNT.userName = this.user.userName;
					if (ans !== undefined)
						ACCOUNT.id = ans;
					console.log(ACCOUNT);
					this.goMainPage();
				});
			//todo add message about wrong password
		// else
		// todo add message about empty login or password
	}

	goMainPage(): void {
		this.router.navigateByUrl('/main');
	}
}
