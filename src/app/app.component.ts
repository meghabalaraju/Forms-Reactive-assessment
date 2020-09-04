import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectstatus = ['Stable', 'Critical', 'Finished'];
  occupiedProjectnames = ['Test', 'Ananya'];

  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      
      // Validator which doesn't allow "Test" as a Project Name
      //'projectname': new FormControl(null, [Validators.required, this.occupiedNames.bind(this)]),
       
      
      'projectname': new FormControl(null, [Validators.required], this.asyncOccupiedName.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectstatus': new FormControl('Finished')
    })
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  // Validator which doesn't allow "Test" as a Project Name
  /** occupiedNames(control: AbstractControl) : {[key: string] : boolean} {
     if(this.occupiedProjectnames.indexOf(control.value) !== -1) {
       return {'occupiedName': true}
     }
     return null
   }  */

  // Async Validator which doesn't allow "Test" as a Project Name
  asyncOccupiedName(control: AbstractControl) : Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(this.occupiedProjectnames.indexOf(control.value) !== -1) {
          resolve({'occupiedName': true})
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
