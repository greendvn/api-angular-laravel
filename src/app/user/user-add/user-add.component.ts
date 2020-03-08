import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  createUserForm;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    let user: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    };
    this.userService.addUser(user).subscribe(next=>(this.router.navigate(['/users'])));
  }

  get name(){
    return this.createUserForm.get('name');
  }
  get email(){
    return this.createUserForm.get('email');
  }
  get password(){
    return this.createUserForm.get('password');
  }
  get confirmPassword(){
    return this.createUserForm.get('confirmPassword');
  }

}
