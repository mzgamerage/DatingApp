import { Component, input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/User';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  membersFromHome = input.required<User[]>();
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  register() {
    console.log(this.creds);
  }

  cancel() {
    console.log("cancelled");
    this.cancelRegister.emit(false);
  }
}
