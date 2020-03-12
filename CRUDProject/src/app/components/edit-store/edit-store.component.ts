import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {
  @ViewChild('resetStoreForm', { static: true }) myNgForm;
  storeForm: FormGroup;
  ngOnInit() {
    this.updateStoreForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private storeApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.storeApi.GetStore(id).subscribe(data => {
      this.storeForm = this.fb.group({
        id: [data.id, [Validators.required]],
        name: [data.name, [Validators.required]],
        address: [data.address, [Validators.required]],
        city: [data.city, [Validators.required]]
      })      
    })    
  }

  updateStoreForm() {
    this.storeForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.storeForm.controls[controlName].hasError(errorName);
  }  

  updateStoreAddForm() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.storeApi.UpdateStore(id, this.storeForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/stores'))
      });
    }
  }
}
