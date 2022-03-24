import { Component, OnInit, ElementRef, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OptionLanguage } from 'src/app/interfaces/OptionDropdown.interface';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NewsService } from 'src/app/services/news.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit, OnDestroy {

  public toggleIsDisplayed: boolean = false;
  public text: String = '';

  public selectedLanguageImage: string = this._ls.getItem('language') ? JSON.parse(this._ls.getItem('language')).photoUrl : '';
  public selectedLanguageText: string = this._ls.getItem('language') ? JSON.parse(this._ls.getItem('language')).name : 'Select your news';

  public dataLanguages: OptionLanguage[] = [
    {
      name: 'Angular',
      photoUrl: 'assets/images/main-view/select-image/angularimg.png'
    },
    {
      name: 'Reactjs',
      photoUrl: 'assets/images/main-view/select-image/reactimg.png'
    },
    {
      name: 'Vuejs',
      photoUrl: 'assets/images/main-view/select-image/vuejsimg.png'
    },
  ];
  public resultSearch: any[] = [];
  public numberOfPages: number = 0;
  public newsPerPage: number = 0;
  public loadingInfo: boolean = false;
  public $getInfo: Subscription = new Subscription();
  public displayedFavorites: any[] = [];
  public currentPage: number = 0;


  @ViewChild('options')
  options!: ElementRef;

  @ViewChild('inside')
  inside!: ElementRef;


  constructor(private _ls: LocalstorageService, private _newsService: NewsService) { }


  ngOnInit(): void {
    this._ls.setItem('currentView', 'main');
    this._ls.setItem('marker', 0);
    if (this._ls.getItem('pageMainView') == 0 || !this._ls.getItem('pageMainView')) {

      this._ls.setItem('pageMainView', 0);
    }
    if (this.selectedLanguageText && this.selectedLanguageText != 'Select your news') {

      if (!this._ls.getItem('pageMainView')) {

        this.getInfo();
      } else {
        this.getInfo(Number(this._ls.getItem('pageMainView')));
      }
    }
  }




  @HostListener('document:click', ['$event']) clickout(event: Event) {

    if (!this.options?.nativeElement.contains(event.target) && !this.inside?.nativeElement.contains(event.target)) {
      this.toggleIsDisplayed = false;
    }
  }



  public toggleSelect(): void {
    this.toggleIsDisplayed = !this.toggleIsDisplayed;
  }

  public selectLanguage(language: OptionLanguage): void {

    
    if(this._ls.getItem('language')){

      if (JSON.parse(this._ls.getItem('language')).name != language.name) {
        
        this._ls.setItem('pageMainView', 0);
        this.selectedLanguageText = language.name;
        this.selectedLanguageImage = language.photoUrl;
        
        this._ls.setItem('language', JSON.stringify(language));
        this.clear();
  
  
        this.loadingInfo = true;
        this.getInfo();
      } else {
        this.toggleIsDisplayed = false;
  
      }
    }else{
      this._ls.setItem('pageMainView', 0);
        this.selectedLanguageText = language.name;
        this.selectedLanguageImage = language.photoUrl;
        
        this._ls.setItem('language', JSON.stringify(language));
        this.clear();
  
  
        this.loadingInfo = true;
        this.getInfo();
    }



  }
  private clear() {
    this.resultSearch = [];
    this.toggleIsDisplayed = false;
  }

  private getInfo(page: number = 0) {
    this.loadingInfo = true;
    this.currentPage = this._ls.getItem('pageMainView')
    this.$getInfo = this._newsService.getNews(this.selectedLanguageText, page).subscribe((res: any) => {
      this.loadingInfo = false;
      this.resultSearch = res.hits;
      this.newsPerPage = res.hitsPerPage;
      this.numberOfPages = res.nbPages;



      if (this._ls.getItem('favorites')) {
        this.displayedFavorites = JSON.parse(this._ls.getItem('favorites')).items;

        this.resultSearch.forEach((resultSearchElement) => {



          this.displayedFavorites.forEach((favorite) => {
            if (favorite.created_at_i == resultSearchElement.created_at_i) {
              resultSearchElement.isFavorite = true;
            }
          })



        })
      }

    })
  }


  onUpdatePage(page: any) {
    this._ls.setItem('pageMainView', page);
    this.getInfo(page);
  }


  ngOnDestroy(): void {
    this.$getInfo.unsubscribe();
  }

}




