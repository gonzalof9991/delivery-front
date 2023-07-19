export class SesionStorage {
  constructor() {
  }

  public set(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any  {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem(key));
  }
}
