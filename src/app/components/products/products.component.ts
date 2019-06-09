import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  public list: any =[];
  id:string;
  p: any;
  private sub: any;
  public product;
  addform: boolean = false;
  editform: boolean = true;
  existval:boolean=false;
 constructor(private _fb: FormBuilder, private route: ActivatedRoute) {
   }
   ngOnInit() {
    this.sub= this.route.params.subscribe(params=>{
      this.id = params['id'];
    })  
    if(localStorage.getItem(this.id)){
        this.product=localStorage.getItem(this.id);
        this.list = this.product.split(',');
        console.log(this.list)
      }
    this.createForm();
    console.log(this.id);

  }
    
  createForm() {
    this.productForm = this._fb.group({
      product: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      olditem: ['']
    });
  }
  checkExist() {
    let value = this.list.includes(this.productForm.value.product);
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
    this.list=localStorage.getItem(this.id);
    this.list = this.list.split(',');
    let localstorageindex = this.list.indexOf(form.value.olditem);
    this.list.splice(localstorageindex,1,form.value.product);
    localStorage.setItem(this.id,this.list);  
    this.productForm.reset();
    this.addform=false;
    this.editform=true;
  }
  onSubmit(form) {
    console.log(form.value.product);
    let value = this.list.includes(form.value.product);
    if(!value) {
      this.list.unshift(form.value.product);
      localStorage.setItem(this.id, this.list);
      this.productForm.reset();

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
    this.productForm=this._fb.group({
      product: [name, [Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
      olditem: [name]
    })
  }


}
