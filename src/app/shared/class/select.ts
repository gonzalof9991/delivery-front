import {Form, FormControl} from "@angular/forms";

export class Select<T> {
  public list: T[] = [];
  public filteredList: T[] = [];
  public form: FormControl;
  constructor(
    form: FormControl,
  ) {
    this.form = form;
  }

  public loadList(list: T[]) {
    this.list = list;
    this.filteredList = list;
  }

  public filter(value: string, property: string) {
    const filteredList = this.list.filter((item: T) => {
      // @ts-ignore
      return item[property].toString().toLowerCase().includes(value.toLowerCase());
    });
    // @ts-ignore
    this.form.setValue(filteredList[0][property]);
  }
}
