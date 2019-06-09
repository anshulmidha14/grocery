import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
itemForm:FormGroup;
list:any=[];
existval: boolean=false;
addform: boolean=false;
editform: boolean=true;
public item;
p: number = 1;
  constructor(private fb: FormBuilder) { 
    if(localStorage.getItem('listname')){
      this.item=localStorage.getItem('listname');
      this.list = this.item.split(',');
      console.log(this.list)
    }
    
  }

  ngOnInit() {
    this.itemForm=this.fb.group({
      item: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
      olditem: ['']
    })
  }

  checkExist() {
    let value = this.list.includes(this.itemForm.value.item);
    if(!value) {
      this.existval = false;    
    }
    else{
      this.existval = true;
    }
  }
  OnEdit(form:FormGroup){
    let index = this.list.indexOf(form.value.olditem);
    this.list.splice(index,1); 
    this.list=localStorage.getItem('listname');
    this.list = this.list.split(',');
    let localstorageindex = this.list.indexOf(form.value.olditem);
    this.list.splice(localstorageindex,1,form.value.item);
    localStorage.setItem('listname',this.list);  
    this.itemForm.reset();
    this.addform=false;
    this.editform=true;
  }
  onSubmit(form:FormGroup) {
  if(localStorage.getItem('listname')){
    this.item=localStorage.getItem('listname');
    this.list = this.item.split(',');
  }
  let value = this.list.includes(form.value.item);
  if(!value) {
    this.existval = false;
    this.list.unshift(form.value.item);
    localStorage.setItem('listname',this.list); 
     
    this.itemForm.reset();  
   
  }
  else{
    this.existval = true;
  }
  
}

delete(name){
  let index = this.list.indexOf(name);
  this.list.splice(index,1);
  this.list=localStorage.getItem('listname');
  this.list = this.list.split(',');
  let localstorageindex = this.list.indexOf(name);
  this.list.splice(localstorageindex,1);
  localStorage.setItem('listname',this.list);   
  console.log(this.list);
}
edit(name){
  this.addform=true;
  this.editform=false;
  this.itemForm=this.fb.group({
    item: [name, [Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
    olditem: [name]
    
   
  })
}
}

