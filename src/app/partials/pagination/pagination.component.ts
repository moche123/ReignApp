import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { finalNumberPages } from 'src/app/utils/finalNumberPages';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input('newsPerPage') newsPerPage: any;
  @Input('numberOfPages') numberOfPages: any;
  @Output() newItemEvent = new EventEmitter();
  public $getInfo: Subscription = new Subscription();
  public currentPageViewMain: any = 0;


  ngOnChanges($ev: any): void {
    this.newsPerPage = $ev.newsPerPage.currentValue;
    this.numberOfPages = $ev.numberOfPages.currentValue;
    this.analyzePages()

  }
  ngOnInit(): void {
    if (this._ls.getItem('pageMainView') && this._ls.getItem('currentView') == 'main') {
      this.currentPageViewMain = this._ls.getItem('pageMainView');
    }

    if (this._ls.getItem('pageFavesView') && this._ls.getItem('currentView') == 'faves') {
      this.currentPageViewMain = this._ls.getItem('pageFavesView');
    }
  }

  public finalNumPages: number[] = [];
  constructor(
    private _ls: LocalstorageService,

  ) { }


  private analyzePages(): void {
    if (this.numberOfPages < 10) {
      if (this.numberOfPages == 1) {
        this.finalNumPages = [0];
        this._ls.setItem('marker', 0);
      } else {
        if (this.numberOfPages == 2) {
          this.finalNumPages = [0, 1];
          this._ls.setItem('marker', 1);
        } else {

          this.finalNumPages = finalNumberPages.slice(0, this.numberOfPages - 1);
          this._ls.setItem('marker', this.finalNumPages);
        }
      }

    } else {
      this.finalNumPages = finalNumberPages.slice(0, 10);
      this._ls.setItem('marker', 10);
    }

  }

  public gotoPage(page: any): void {
    if(Number(this._ls.getItem('pageMainView')) != page){

      this.currentPageViewMain = page;
      this.newItemEvent.emit(page);
    }
  }

  public resetPages(): void {
    this.finalNumPages = finalNumberPages.slice(Number(this._ls.getItem('marker')), Number(this._ls.getItem('marker')) + 10);
    this._ls.setItem('marker', Number(this._ls.getItem('marker')) + 10);
  }

  public previousPage(): void {
    this.finalNumPages = finalNumberPages.slice(Number(this._ls.getItem('marker')) - 20, Number(this._ls.getItem('marker')) - 10);
    this._ls.setItem('marker', Number(this._ls.getItem('marker')) - 10);
  }

}
