import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { DarkModeEnum } from "../models/Enums";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class ColorSchremeService {

  private _colorScheme: Subject<string> = new BehaviorSubject<string>(DarkModeEnum.LIGHT_MODE);

  get colorScheme() {
    return this._colorScheme.asObservable();
  }

  constructor(
    private storageService: StorageService
  ){}

  setColorScheme(mode: string) {
    this._colorScheme.next(mode);
    if(mode === DarkModeEnum.DARK_MODE && !document.body.classList.contains('dark')) {
      this.storageService.set('colorscheme', DarkModeEnum.DARK_MODE);
      document.body.classList.add('dark');
    } else if(!mode || mode === DarkModeEnum.LIGHT_MODE) {
      this.storageService.set('colorscheme', DarkModeEnum.LIGHT_MODE);
      document.body.classList.remove('dark');
    }
  }
}
