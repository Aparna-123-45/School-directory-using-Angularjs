import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router,private http:HttpClient){

  } 
  ngOnInit(): void {
    this.loginform=this.formBuilder.group({
   roll:['',Validators.required],
   password:['',Validators.required],
    })
      
  }
  login(){
    this.http.get<any>("http://localhost:3000/posts").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.roll === this.loginform.value.roll && a.password === this.loginform.value.password
      })
      if(user){
        alert("successfully logged in");
        this.loginform.reset();
        this.router.navigate(['student'])
      }else{
        alert('User not found with these credentials');
      }; err=>{
        alert("Something went wrong");
      }
    })
  }

}
