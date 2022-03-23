import { Component, OnInit, ElementRef, HostListener, ViewChild, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OptionLanguage } from 'src/app/interfaces/OptionDropdown.interface';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NewsService } from 'src/app/services/news.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit,OnDestroy {

  public toggleIsDisplayed:boolean = false; 
  public text: String = '';

  public selectedLanguageImage:string =  this._ls.getItem('language')?JSON.parse(this._ls.getItem('language')).photoUrl:'';
  public selectedLanguageText:string = this._ls.getItem('language')?JSON.parse(this._ls.getItem('language')).name:'Select your news';

  public dataLanguages: OptionLanguage[] = [
    {
      name: 'Angular',
      photoUrl:'assets/images/main-view/select-image/angularimg.png'
    },
    {
      name: 'Reactjs',
      photoUrl:'assets/images/main-view/select-image/reactimg.png'
    },
    {
      name: 'Vuejs',
      photoUrl:'assets/images/main-view/select-image/vuejsimg.png'
    },
  ];
  public resultSearch: any[] = [];
  public numberOfPages:number = 0;
  public newsPerPage:number = 0;
  public loadingInfo:boolean = false;
  public $getInfo:Subscription= new Subscription();


  @ViewChild('options')
  options!: ElementRef;

  @ViewChild('inside')
  inside!: ElementRef;


  constructor(private _ls:LocalstorageService,private _newsService:NewsService) {}
  
  ngOnInit(): void {
    if(this.selectedLanguageText){
      this.getInfo();
    }
  }
  



  @HostListener('document:click', ['$event']) clickout(event:Event) { 
    
    if(! this.options?.nativeElement.contains(event.target) && !this.inside?.nativeElement.contains(event.target)) { 
      this.toggleIsDisplayed = false;
    } 
  }
  


  public toggleSelect():void{
    this.toggleIsDisplayed = !this.toggleIsDisplayed;
  }

  public selectLanguage(language:OptionLanguage):void{
    this.selectedLanguageText = language.name;
    this.selectedLanguageImage = language.photoUrl;
    this._ls.setItem('language', JSON.stringify(language));
    this.clear();


    this.loadingInfo = true;
    this.getInfo();
    
  }
  private clear(){
    this.resultSearch = [];
    this.toggleIsDisplayed = false;
  }

  private getInfo(){
    this.loadingInfo = true;
    this.$getInfo = this._newsService.getNews(this.selectedLanguageText).subscribe((res:any) => {
      this.loadingInfo = false;
      this.resultSearch = res.hits;
      console.log(this.resultSearch)
    })
  }


  ngOnDestroy(): void {
    this.$getInfo.unsubscribe();
  }

}




