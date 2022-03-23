import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  public localStorage = localStorage;
  constructor() { }


  public setItem(key:string, value:any):void{
    this.localStorage.setItem(key, value);
  }

  public getItem(key:string):any{
    return this.localStorage.getItem(key)!;
  }

  public removeItem(key:string):void{
    this.localStorage.removeItem(key);
  }

  public clear():void{
    this.localStorage.clear();
  }

  public get length():number{
    return this.localStorage.length;
  }

  public key(index:number):string{
    return this.localStorage.key(index)!;
  }

}
