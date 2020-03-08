import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editUserForm;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.email]]
    });
    const id= +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByID(id).subscribe(next=> {this.user= next;
    this.editUserForm.patchValue(this.user);
    }, error => {this.user= null});
    console.log(this.user);
  }

  onSubmit(data){
    this.user.name = data.name;
    this.user.email = data.email;
    this.userService.updateUser(this.user).subscribe(next=>(this.router.navigate(['/users'])));
  }

  get name(){
    return this.editUserForm.get('name');
  }
  get email(){
    return this.editUserForm.get('email');
  }

}
