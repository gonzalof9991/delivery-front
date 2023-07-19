import {Component, OnInit} from '@angular/core';
import {Table} from "../../shared/class/table";
import {ICategory, IClient} from "./home.interface";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./components/dialog/dialog.component";
import {SharedService} from "../../shared/services/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit{
  public columns: string[] = [ 'id', 'name',  'created_at', 'category' , 'subcategory', 'price', 'completed', 'type',      'delivered',      'options'];
  public dataSource: IClient[];
  public categories: ICategory[];
  public table: Table<any>;
  public homeDialog: HomeDialog<IClient>;
  constructor(
    private _dialog: MatDialog,
    private _sharedService: SharedService
  ) {
    this.table = new Table<IClient>(
      this.columns,
    );
    this.dataSource = [
      {id: 1, delivered: false, completed: false, name: 'John', createdAt:'2021-01-01', deliveredAt: '2021-01-01', price: 9000, category: 'Guirnaldas', subcategory: 'Elefantes', type: 'Starken'},
      {id: 2, delivered: false, completed: true, name: 'Pedro', createdAt:'2021-01-01', deliveredAt: '2021-01-01', price: 9000, category: 'Guirnaldas', subcategory: 'Elefantes', type: 'Presencial'},
      {
        id: 3,
        delivered: false,
        completed: false,
        name: 'Juan',
        createdAt: '2021-01-01',
        deliveredAt: '2021-01-01',
        price: 9000,
        category: 'Guirnaldas',
        subcategory: 'Elefantes',
        type: 'Starken'
      }
    ]
    this.categories = [];
    this.homeDialog = new HomeDialog<IClient>(
      this._dialog,
    );
  }

  ngOnInit() {
    const clients = this._sharedService.sesionStorage.get('clients');
    if (clients) {
      this.dataSource = clients;
    }
    this.table.dataSource.data = this.dataSource;
    this.table.changes$();
    this.categories = this._sharedService.categories;
  }

  public listenCheck(event: any, element: IClient) {
    this._sharedService.sesionStorage.set('clients', this.dataSource);
  }

  public async createDialog(): Promise<void> {
    const flag = await this.homeDialog.open({
      component: DialogComponent,
      width: 'w-full',
      data: null,
      disableClose: true,
      type: 'create',
      panelClass: ['w-screen',  '!max-w-full', 'max-h-full',  'lg:w-screen-lg', 'lg:!max-w-screen-lg', 'lg:max-h-screen-lg']
    })

    if (!flag) {
      return;
    }

    if (this.homeDialog.data) {
      this.homeDialog.data.id = this.dataSource.length + 1;
      this.dataSource.push(this.homeDialog.data);
      this.table.dataSource.data = this.dataSource;
      this._sharedService.sesionStorage.set('clients', this.dataSource);
    }
  }


  public remove(element: IClient): void {
    const index = this.dataSource.findIndex((item: IClient) => item.id === element.id);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.table.dataSource.data = this.dataSource;
      this._sharedService.sesionStorage.set('clients', this.dataSource);
    }
  }

  public async view(element: IClient): Promise<void> {
    const flag = await this.homeDialog.open({
      component: DialogComponent,
      width: 'w-full',
      data: element,
      disableClose: true,
      type: 'view',
      panelClass: ['w-screen',  '!max-w-full', 'max-h-full',  'lg:w-screen-lg', 'lg:!max-w-screen-lg', 'lg:max-h-screen-lg']
    })
  }
}

// --------------->
// @ Class HomeDialog
// --------------->
export class HomeDialog <T> {
  public data: T | null = null;
  constructor(
    private _dialog: MatDialog
  ) {
  }

  public open(options: {
    width?: string,
    data?: T | null,
    disableClose?: boolean,
    panelClass?: string[],
    component: any,
    type?: string
  }): Promise<boolean>{
    const dialogRef = this._dialog.open(options.component, {
      width: options.width || 'w-full',
      data: {
        data: options.data || null,
        type: options.type || null
      },
      disableClose: options.disableClose || true,
      panelClass: options.panelClass
    });
    return new Promise<boolean>((resolve, reject) => {
      dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'save') {
          this.data = result.data;
          resolve(true);
          return;
        }
        this.data = null;
        resolve(false);
      });
    });

  }
}
