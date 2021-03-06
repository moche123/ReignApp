import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { finalNumberPages } from 'src/app/utils/finalNumberPages';

@Component({
  selector: 'app-faves',
  templateUrl: './faves.component.html',
  styleUrls: ['./faves.component.css']
})
export class FavesComponent implements OnInit {
  public loadingInfo: boolean = false;
  public resultSearch: any[] = [];
  public resultAll: any[] = [];
  public numberOfPages: number = 0;
  public newsPerPage: number = 10;
  public favesPageSelected:number = 0;
  public finalNumPages = finalNumberPages;
  public marker:number = 0;
  public generalNumberOfPages:number = 0;

  constructor(private _ls: LocalstorageService) {

    if (this._ls.getItem('pageFavesView')) {
      this.favesPageSelected = this._ls.getItem('pageFavesView');

    }else{
      this._ls.setItem('pageFavesView',0)
      this.favesPageSelected = 0;
    }
   }

  ngOnInit(): void {
    this._ls.setItem('currentView', 'faves');
    this._ls.setItem('marker', 0);
    this.getInfoInitial();

  }

  getFavorites() {
    return JSON.parse(this._ls.getItem('favorites'))?.items || [];
  }


  private getInfoInitial():void{
    this.resultSearch = this.getFavorites();


    this.numberOfPages = Math.ceil(this.resultSearch.length / this.newsPerPage);

    if(this.numberOfPages>10){


      this._ls.setItem('marker', this.numberOfPages/10);
      this.marker = (this.numberOfPages/10);

    }

    if(this.numberOfPages > 1){

      for (let index = 0; index <  this.numberOfPages; index++) {
        this.resultAll.push(this.resultSearch.slice(index * this.newsPerPage, (index + 1) * this.newsPerPage));
        
      }
    }else{
      this.numberOfPages = 1;
      this.resultAll.push(this.resultSearch);
    }

    this.getInfo();
  }

  private getInfo(): void {
   

    this.finalNumPages = finalNumberPages.slice(0,this.numberOfPages) 


    this.resultSearch = this.resultAll[this.favesPageSelected];

  }




  onDelete(favorite: any) {
    let indexToRemove = this.resultSearch.findIndex((item: any) => item.created_at_i == favorite.created_at_i);

    this.resultSearch.splice(indexToRemove, 1);

    if(this.resultSearch.length == 0 && this.favesPageSelected > 0){
      this.numberOfPages -= 1;
      this.gotoPage(this.favesPageSelected-1);
    }



  }

  gotoPage(page: any) {
    this.favesPageSelected = page;
    this._ls.setItem('pageFavesView', page);
    this.getInfo();
  }



 
  public goAhead():void{
    this._ls.setItem('marker', this.marker+10);
    this.finalNumPages = finalNumberPages.slice(this.marker,this.marker+10)
  }

  public goBack():void{
    this._ls.setItem('marker', this.marker-10);
    this.finalNumPages = finalNumberPages.slice(this.marker-20,this.marker-10)
  }



}
