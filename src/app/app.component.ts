import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateMessage } from './validate-message';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 6';
  form: FormGroup;
  testValidateOption = new Map<string, ValidateMessage>();
  test2ValidateOption = new Map<string, ValidateMessage>();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      test: ['test', Validators.compose([Validators.required, Validators.maxLength(5)])],
      test2: ['test2', Validators.compose([Validators.minLength(6), Validators.min(222222)])]
    });
    
    // validate options for test
    this.testValidateOption.set('required', {
      type: 'required',
      id: 'test-required',
      message: 'This field is required'
    });
    this.testValidateOption.set('max', {
      type: 'maxlength',
      id: 'test-maxLength',
      message: 'This field can not have more than 5 characters.'
    });

    // validate options for test2
    this.test2ValidateOption.set('minLength', {
      type: 'minlength',
      id: 'test2-minlength',
      message: 'This field should have at least 6 characters.'
    });
    this.test2ValidateOption.set('min', {
      type: 'min',
      id: 'test2-min',
      message: 'This field\'s valus should be bigger than 222222.'
    })
  }
}
