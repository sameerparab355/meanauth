import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username :String;
  email :String;
  password : String;

  constructor( private validateService : ValidateService ,
   private flashmessage : FlashMessagesService,
   private authService : AuthService,
   private router :Router
   ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
   // console.log(this.name);
      const user = {
          name: this.name,
          username :this.username,
          email : this.email,
          password : this.password
      }

     // Required Fields
     if( ! this.validateService.validateRegister(user)) {
        //console.log("Please fill all the fields");
        this.flashmessage.show("Please fill all the fields" , {cssClass :'alert-danger' , timeout:3000});
        return false;
     }


 // Required Fields
     if( ! this.validateService.validateEmail(user.email)) {
        //console.log("Please use email Addess");
         this.flashmessage.show("Please use email Addess");
        return false;
     }

 // Register the User

 this.authService.registerUser(user).subscribe( data => {
    if(data.success){
      this.flashmessage.show("You are now register and can login" , {cssClass :'alert-success' , timeout:3000});
      this.router.navigate(['/login']);
    }else{
      this.flashmessage.show("Something went wrong" , {cssClass :'alert-danger' , timeout:3000});
      this.router.navigate(['/register']);
    }
 })

  }

}
