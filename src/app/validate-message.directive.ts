import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { ValidateMessage } from './validate-message';
@Directive({
  selector: '[validate-message]'
})
export class ValidatorMessageDirective implements OnInit {
  @Input('validate-message')
  option: Map<string, ValidateMessage>;
  constructor(
    private elem: ElementRef,
    private control: NgControl
  ) { }

  ngOnInit() {
    const control = this.control.control;

    control.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      console.log(control);
      this.option.forEach(validate => {
        if (control.hasError(validate.type)) {
          const validateMessageElem = document.getElementById(validate.id);
          if (!validateMessageElem) {
            const divElem = document.createElement('div');
            divElem.innerHTML = validate.message;
            divElem.id = validate.id;
            this.elem.nativeElement.parentNode.insertBefore(divElem, this.elem.nativeElement.nextSibling);
          }
        } else {
          const validateMessageElem = document.getElementById(validate.id);
          if (validateMessageElem) {
            this.elem.nativeElement.parentNode.removeChild(validateMessageElem);
          }
        }
      })
    });
  }
}