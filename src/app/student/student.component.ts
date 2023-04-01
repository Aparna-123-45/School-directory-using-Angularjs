import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import{ FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentdata } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  showadd!:boolean;
  showupdate!:boolean; 
  formValue!:FormGroup;
  studentmodelobj:studentdata=new studentdata
  allstudentdata:any;
  constructor(private formBuilder:FormBuilder,private api:ApiService){}
  ngOnInit(): void {
      this.formValue=this.formBuilder.group({
        name:['',Validators.required],
        class:['',Validators.required],
        roll:['',Validators.required],
        section:['',Validators.required],
        fee:['',Validators.required], 
      }),
      this.getdata()
  }
  add(){
   this.showadd=true;
   this.showupdate=false;
  }
  edit(data:any){
    this.showadd=false;
   this.showupdate=true;
   this.studentmodelobj.id=data.id;
   this.formValue.controls['name'].setValue(data.name)
   this.formValue.controls['class'].setValue(data.class)
   this.formValue.controls['roll'].setValue(data.roll)
   this.formValue.controls['section'].setValue(data.section)

  }
  update(){
    this.studentmodelobj.name= this.formValue.value.name;
    this.studentmodelobj.class=this.formValue.value.class;
    this.studentmodelobj.roll=this.formValue.value.roll;
    this.studentmodelobj.section=this.formValue.value.section;

    this.api.updatestudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
      this.formValue.reset()
      this.getdata();
        alert("Record updated successfully");
    },
    err=>{
      alert("something went wrong")
    }
    )

  }
  addstudent(){
    this.studentmodelobj.name= this.formValue.value.name;
    this.studentmodelobj.class=this.formValue.value.class;
    this.studentmodelobj.roll=this.formValue.value.roll;
    this.studentmodelobj.section=this.formValue.value.section;
    this.studentmodelobj.fee=this.formValue.value.fee;
    
    this.api.poststudent(this.studentmodelobj).subscribe(res=> {
      console.log(res)
      this.formValue.reset()
      this.getdata()
         alert("Record added successfully");
    },
    err=>{
      alert("something went wrong");
    }
    
    )
    
  }
  getdata(){
    this.api.getstudent()
    .subscribe(res=>{
      this.allstudentdata=res;
    })
  }
  deletestudent(data:any){
    if(confirm('Are you sure to delete?'))
    this.api.deletestudent(data.id)
    .subscribe(res=>{
      alert("Record deleted successfully");
      this.getdata()
    })
  }

}

  




