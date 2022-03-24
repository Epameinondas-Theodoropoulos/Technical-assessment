import { Component, OnInit } from '@angular/core';
import { DarkModeEnum } from './models/Enums';
import { ColorSchremeService } from './services/color-scheme.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-technical-assessment';

  constructor(
    private storageService: StorageService,
    private colorSchremeService: ColorSchremeService
  ){}

  ngOnInit(): void {
      let colorscheme = this.storageService.get('colorscheme') as string;
      if(colorscheme && colorscheme === DarkModeEnum.DARK_MODE) {
        this.colorSchremeService.setColorScheme(DarkModeEnum.DARK_MODE);
      } else if((colorscheme && colorscheme === DarkModeEnum.LIGHT_MODE) || !colorscheme) {
        this.colorSchremeService.setColorScheme(DarkModeEnum.LIGHT_MODE);
      }
  }
}
