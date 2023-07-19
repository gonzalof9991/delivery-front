import {FormControl} from "@angular/forms";

export class Input {
  public form: FormControl;
  public type: string = 'text';
  constructor(
    form: FormControl,
    type: string
  ) {
    this.form = form;
    this.type = type;
  }
}
