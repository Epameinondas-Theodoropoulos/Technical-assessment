import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoctailModel } from 'src/app/models/coctail.model';
import { CoctailPresenter } from './coctail.presenter';

@Component({
  selector: 'app-coctail',
  templateUrl: './coctail.component.html',
  styleUrls: ['./coctail.component.scss'],
  providers: [CoctailPresenter]
})
export class CoctailComponent implements OnInit, OnDestroy {

  get coctail(): CoctailModel {
    return this.presenter.coctail;
  }

  get ingredients(): string[] {
    return this.presenter.ingredients;
  }

  get measures(): string[] {
    return this.presenter.measures;
  }

  get loading(): boolean {
    return this.presenter.loading;
  }

  constructor(
    private route: ActivatedRoute,
    private presenter: CoctailPresenter
  ) { }

  ngOnInit(): void {
    this.presenter.init(this.route);

  }

  getIngrdient(ingr: string): string | undefined {
    return this.presenter.getIngrdient(ingr);
  }

  getMeasure(msr: string): string | undefined {
    return this.presenter.getMeasure(msr);
  }

  ngOnDestroy(): void {
      this.presenter.onDestroy();
  }

}
