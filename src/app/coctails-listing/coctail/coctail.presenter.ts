import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CoctailModel } from "src/app/models/coctail.model";
import { CoctailsService } from "src/app/services/coctails.service";

@Injectable()
export class CoctailPresenter {

  subs: Subscription[] = [];
  loading: boolean = true;
  coctail: CoctailModel = {
    idDrink: '0'
  };
  parsed: any;
  ingredients: string[] = [];
  measures: string[] = [];

  constructor(
    private router: Router,
    private coctailsService: CoctailsService
    ) {}

  init(route: ActivatedRoute) {
    this.subs.push(route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        this.router.navigate(['coctails-listing']);
        return;
      }
      this.loading = true;
      let id: any;
      if(paramMap.get("id") !== null) {
        id = paramMap.get("id");
      }
      this.subs.push(this.coctailsService.getCoctailById(id).subscribe(coctail => {
        if(coctail && coctail.drinks[0]) {
          this.coctail = coctail.drinks[0];
          this.ingredients = Object.keys(this.coctail).filter((keys: any) => {
            if(keys.includes('strIngredient') && this.coctail[keys as keyof CoctailModel]) {
              return keys;
            }
          });

          this.measures = Object.keys(this.coctail).filter((keys: any) => {
            if(keys.includes('strMeasure') && this.coctail[keys as keyof CoctailModel]) {
              return keys;
            }
          });
        }
        this.parsed = JSON.stringify(coctail);
        this.loading = false;
      }));
    }));
  }

  getIngrdient(ingr: string): string | undefined {
    return this.coctail[ingr as keyof CoctailModel];
  }

  getMeasure(msr: string): string | undefined {
    return this.coctail[msr as keyof CoctailModel];
  }

  onDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }
}
