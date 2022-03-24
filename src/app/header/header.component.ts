import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { DarkModeEnum } from '../models/Enums';
import { ColorSchremeService } from '../services/color-scheme.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  darkmode: string = '';
  constructor(
    private storageService: StorageService,
    private renderer: Renderer2,
    private colorSchremeService: ColorSchremeService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.darkmode = this.storageService.get('colorscheme') as string;
    if(this.darkmode === DarkModeEnum.DARK_MODE) {
      this.renderer.setAttribute(document.getElementById('darkmode'), 'checked', 'true');
    }
  }

  changeDarkMode(event: any): void {
    const colorscheme: string = event.target.checked ? DarkModeEnum.DARK_MODE : DarkModeEnum.LIGHT_MODE;
    this.colorSchremeService.setColorScheme(colorscheme);
  }

}
