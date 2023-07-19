export class LocalStorage {
  constructor() {
  }

  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any  {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
  }
}
