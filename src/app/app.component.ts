import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shorturl-test';
  action :string = "shorturl";
  format : string = "json";

  //Form builder to handle user inputs
  loginForm = this.formBuilder.group({
    username:['',Validators.required],
    password:['',Validators.required],
    url: '',
    action:this.action,
    format: this.format,
  });

  /*Constructor containing the declaration of the form builder*/
  constructor(
    private formBuilder: FormBuilder,
    private services: ConfigService
  ){}


  //method to handle submission of form
  onSubmit():void{
    
    //make query to backend
    this.services.login(this.loginForm.value).subscribe({
      next:(response)=>{
        console.log('Response',response);
      },
      error:(error)=>{
        console.log('Error',error);
      },
      complete: ()=>{
        this.loginForm.reset();
      }
    })
  }
}
