import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
  })
export class StorageService {

  set(key: string, value: any): void {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    }

  get(key: string): Object {
      const item = localStorage.getItem(key) as string;
      return JSON.parse(item);
  }

}
