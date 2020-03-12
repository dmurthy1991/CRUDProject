import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetStoreForm', { static: true }) myNgForm;
  storeForm: FormGroup;
  
  ngOnInit() {
    this.submitStoreForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private storeApi: ApiService
  ) { }

  /* Reactive book form */
  submitStoreForm() {
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

  /* Submit book */
  submitStoreAddForm() {
    if (this.storeForm.valid) {
      this.storeApi.AddStores(this.storeForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/stores'))
      });
    }
  }


}
