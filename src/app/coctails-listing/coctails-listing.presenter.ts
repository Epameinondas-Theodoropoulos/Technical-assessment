import { Injectable, Renderer2 } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Observable, of, Subscription, switchMap } from "rxjs";
import { CoctailModel } from "../models/coctail.model";
import { DrinksModel } from "../models/Drinks.model";
import { DarkModeEnum } from "../models/Enums";
import { CoctailsService } from "../services/coctails.service";
import { ColorSchremeService } from "../services/color-scheme.service";

@Injectable()
export class CoctailsPresenter {

  allCoctails: CoctailModel[] = [];
  loading: boolean = true;
  searchForm: FormGroup = new FormGroup({});
  ingredients: string[] = [];
  categories: string[] = [];
  allLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  usedLetters: string[] = [];
  coctailsCalls: Observable<DrinksModel>[] = [];
  category: string = 'All Categories';
  defaultCategory: string = 'All Categories';
  subs: Subscription[] = [];
  imgLoading: boolean = true;
  unlistenScroll: () => void = (() => {});

  constructor(
    private fb: FormBuilder,
    private coctailsService: CoctailsService,
    private colorSchremeService: ColorSchremeService
  ) { }

  init(): void {
    this.loading = true;

    this.getAllCoctails(this.allLetters[0]);

    this.subs.push(this.coctailsService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.categories.push(this.defaultCategory);
    }));

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(letters => {
        if(letters === null) {
          return of(null);
        }

        if(this.category !== this.defaultCategory) {
          this.category = this.defaultCategory;
        }

        this.loading = true;
        if(letters?.trim() === "") {
          this.usedLetters = [];
          this.allCoctails = [];
          this.searchForm.get('search')?.patchValue(null);
          this.getAllCoctails(this.allLetters[0]);
          return of(null);
        } else {
          this.imgLoading = true;
          return this.coctailsService.getCoctailByName(letters?.trim());
        }
      })
    ).subscribe(coctails => {
      if(coctails) {
        this.allCoctails = coctails.drinks;
        this.loading = false;
        this.imgLoading = false;
      }
    });
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      search: new FormControl(null)
    });
  }

  afterViewInit(rendered: Renderer2): void {
    this.colorSchremeService.colorScheme.subscribe(mode => {
      if(mode === DarkModeEnum.DARK_MODE) {
        rendered.addClass(document.getElementById('dropdownMenu'), 'dropdown-menu-dark');
      } else if(!mode || mode === DarkModeEnum.LIGHT_MODE) {
        rendered.removeClass(document.getElementById('dropdownMenu'), 'dropdown-menu-dark');
      }
    });

    this.unlistenScroll = rendered.listen(window, "scroll", event => {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 200) {
        let filteredLetters = this.allLetters.filter(all => !this.usedLetters.includes(all))
        if(filteredLetters && filteredLetters.length > 0 && this.category === this.defaultCategory && this.searchForm.get('search')?.value === null) {
          this.getAllCoctails(filteredLetters[0]);
        }
       }

    });
  }

  getAllCoctails(letter: string): void {
    this.imgLoading = true;
    this.usedLetters.push(letter);
    this.subs.push(this.coctailsService.getAllCoctails(letter).subscribe((allCoctails: DrinksModel) => {
      if(allCoctails && allCoctails.drinks) {
        this.allCoctails.push(...allCoctails.drinks);
      }

      this.loading = false;
      this.imgLoading = false;
    }));
  }

  clickCategory(category: string): void {
    this.loading = true;
    this.category = category;
    if(this.searchForm.get('search')?.value !== null) {
      this.searchForm.reset();
    }

    if(category === this.defaultCategory) {
      this.usedLetters = [];
      this.allCoctails = [];
      this.getAllCoctails(this.allLetters[0]);
    } else {
      this.imgLoading = true;
      this.subs.push(this.coctailsService.filterByCategory(category).subscribe(coctails => {
        this.allCoctails = coctails.drinks;
        this.loading = false;
        this.imgLoading = false;
      }));
    }
  }

  getIngrdients(coctail: CoctailModel): string[] {
    let ingredients: string[] = Object.keys(coctail).filter((keys: any) => {
      if(keys.includes('strIngredient') && coctail[keys as keyof CoctailModel]) {
        return keys;
      }
    });

    return ingredients;
  }

  getIngrdient(ingr: string, coctail: CoctailModel): string | undefined {
    return coctail[ingr as keyof CoctailModel];
  }

  onDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    this.unlistenScroll();
  }
}
