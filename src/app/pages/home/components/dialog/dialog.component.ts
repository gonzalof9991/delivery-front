import {Component, forwardRef, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Select} from "../../../../shared/class/select";
import {FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {ICategory, IClient, IDialog, ISelect, ISubcategory} from "../../home.interface";
import {Input} from "../../../../shared/class/input";
import {SharedService} from "../../../../shared/services/shared.service"
import * as moment from 'moment';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
  ]
})
export class DialogComponent {
  public form: DialogForm;
  public minDate: string;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialog,
    private _sharedService: SharedService
    ) {
    this.form = new DialogForm(
      this._sharedService
    );
    if (!data.data) {
      this.loadState();
    }else{
      this.form.load(data.data);
    }
    this.minDate = moment().format();
  }

  public loadState(): void {
    this.form.category.loadList(this._sharedService.categories);
  }

  public close(params: 'cancel' | 'save') {
    if (params === 'cancel') {
        this.dialogRef.close({
          event: params,
          data: null
        });
        return;
    }
    const check = this.form.checkForm();

    if (!check) {
      return;
    }
    const newData = this.form.transformData(this.form.formGroup.value);
    this.dialogRef.close({
      event: 'save',
      data: newData
    });
  }
}


export class DialogForm {
  public formGroup: FormGroup;
  public category: Select<ICategory>
  public subcategory:  Input;
  public type: Select<ISelect>;
  public deliveredAt: Input;
  public delivered: Select<ISelect>;
  public completed: Select<ISelect>;
  public name: Input;
  public price: Input;
  public observation: Input;

  constructor(
    private _sharedService: SharedService
  ) {
    this.category = new Select<ICategory>(new FormControl(
      '', [Validators.required]
    ));

    this.subcategory = new Input(new FormControl(
      '', [Validators.required]
    ), 'text');

    this.deliveredAt = new Input(new FormControl(
      '', [Validators.required]
    ), 'date');

    this.type = new Select<ISelect>(new FormControl(
      '', [Validators.required]
    ));

    this.delivered = new Select<ISelect>(new FormControl(
      '', [Validators.required]
    ));

    this.completed = new Select<ISelect>(new FormControl(
      '', [Validators.required]
    ));

    this.name = new Input(new FormControl('', [Validators.required]),'text');
    this.price = new Input(new FormControl('', [Validators.required]),'number');
    this.observation = new Input(new FormControl(''), 'text');

    this.formGroup = new FormGroup({
      name: this.name.form,
      price: this.price.form,
      observation: this.observation.form,
      type: this.type.form,
      category: this.category.form,
      subcategory: this.subcategory.form,
      delivered: this.delivered.form,
      completed: this.completed.form,
      deliveredAt: this.deliveredAt.form,
    })
  }

  public checkForm(): boolean {
    this.formGroup.markAllAsTouched();
    return this.formGroup.valid;
  }

  public transformData(data: IClient): IClient {
    data.deliveredAt = moment(data.deliveredAt).format('YYYY-MM-DD');
    data.createdAt = moment().format('YYYY-MM-DD');
    // @ts-ignore
    data.delivered = data.delivered === 'true';
    // @ts-ignore
    data.completed = data.completed === 'true';
    return data;
  }

  public load(client: IClient){
    try {
      this.name.form.setValue(client.name);
      this.price.form.setValue(client.price);
      this.observation.form.setValue(client.observation);
      this.type.form.setValue(String(client.type));
      this.category.loadList(this._sharedService.categories);
      this.category.filter(client.category,'name');
      this.subcategory.form.setValue(client.subcategory);
      this.delivered.form.setValue(String(client.delivered));
      this.completed.form.setValue(String(client.completed));
      this.deliveredAt.form.setValue(client.deliveredAt);
    } catch (e) {
    }
  }


}

