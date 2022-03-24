import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoctailModel } from '../models/coctail.model';
import { CoctailsPresenter } from './coctails-listing.presenter';

@Component({
  selector: 'app-coctails-listing',
  templateUrl: './coctails-listing.component.html',
  styleUrls: ['./coctails-listing.component.scss'],
  providers: [CoctailsPresenter]
})
export class CoctailsListingComponent implements OnInit, OnDestroy, AfterViewInit {

  get allCoctails(): CoctailModel[] {
    return this.presenter.allCoctails
  }

  get loading(): boolean {
    return this.presenter.loading;
  }

  get ingredients(): string[] {
    return this.presenter.ingredients;
  }

  get categories(): string[] {
    return this.presenter.categories;
  }

  get category(): string{
    return this.presenter.category;
  }

  get defaultCategory(): string {
    return this.presenter.defaultCategory;
  }

  get imgLoading(): boolean {
    return this.presenter.imgLoading;
  }

  get searchForm(): FormGroup {
    return this.presenter.searchForm;
  }

  constructor(
    private presenter: CoctailsPresenter,
    private rendered: Renderer2,
    private scroll: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.presenter.initForm();
    this.presenter.init();
  }

  ngAfterViewInit(): void {
    this.presenter.afterViewInit(this.rendered);
  }

  clickCategory(category: string): void {
    this.presenter.clickCategory(category);
  }

  ngOnDestroy(): void {
    this.presenter.onDestroy();
  }

  scrollToTop(): void{
    this.scroll.scrollToPosition([0,0]);
  }

  getIngrdients(coctail: CoctailModel): string[] {
    return this.presenter.getIngrdients(coctail);
  }

  getIngrdient(ingr: string, coctail: CoctailModel): string | undefined {
    return this.presenter.getIngrdient(ingr, coctail);
  }

}
