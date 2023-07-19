import { Injectable } from '@angular/core';
import {ICategory} from "../../pages/home/home.interface";
import {SesionStorage} from "../class/sesion-storage";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public categories: ICategory[];
  public sesionStorage: SesionStorage;
  constructor() {
    this.categories = [
      {
        id: 1,
        name: 'Peluche'
      },
      {
        id: 2,
        name: 'Guirnalda'
      },
      {
        id: 3,
        name: 'Collets'
      },
      {
        id: 4,
        name: 'Pinches'
      },
      {
        id: 5,
        name: 'Diadema'
      }
    ]
    // set sesion storage
    this.sesionStorage = new SesionStorage();
  }
}
