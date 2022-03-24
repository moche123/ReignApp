import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';



@Component({
  selector: 'app-rectangle-result',
  templateUrl: './rectangle-result.component.html',
  styleUrls: ['./rectangle-result.component.css']
})
export class RectangleResultComponent implements OnInit {

  @Input('result') result: any;
  @Output() newItemEvent = new EventEmitter();
  constructor(private _ls: LocalstorageService) { }



  ngOnInit(): void {
  }


  public timeDifference(created_at: any) {

    let days = new Date().getDay() - new Date(created_at).getDay();
    if (days != 0) {
      return days + ' days ago';
    } else {
      let hours = new Date().getHours() - new Date(created_at).getHours();
      if (hours != 0) {
        return hours + ' hours ago';
      } else {
        let minutes = new Date().getMinutes() - new Date(created_at).getMinutes();
        if (minutes != 0) {
          return minutes + ' minutes ago';
        } else {
          return 'now';
        }
      }
    }
  }


  public goToLink(story_url: any) {
    window.open(story_url, '_blank');
  }

  public takeOutResultToFavorites(result: any, objectFavoritesFromLS: any) {
    let favoritesFromLocalStorage = JSON.parse(objectFavoritesFromLS);
    let indexToRemove = favoritesFromLocalStorage.items.findIndex((item: any) => item.created_at_i == result.created_at_i);
    favoritesFromLocalStorage.items.splice(indexToRemove, 1);
    this._ls.setItem('favorites', JSON.stringify(favoritesFromLocalStorage));
  }

  public addResultToFavorites(result: any, objectFavoritesFromLS: any) {
    let favoritesFromLocalStorage = JSON.parse(objectFavoritesFromLS);
    favoritesFromLocalStorage.items.push({
      author: result.author,
      story_title: result.story_title,
      isFavorite: true,
      created_at: result.created_at,
      created_at_i: result.created_at_i,
      stody_url: result.story_url,
    });
    this._ls.setItem('favorites', JSON.stringify(favoritesFromLocalStorage));

  }


  public toggleFavorite(result: any) {

    let objectFavorites = {
      items: []
    }

    let objectFavoritesFromLS = JSON.stringify(objectFavorites)

    if (!this._ls.getItem('favorites')) {

      this._ls.setItem('favorites', objectFavoritesFromLS);
      this.conditionalIsFavorite(result);
    } else {

      this.conditionalIsFavorite(result);
    }
    result.isFavorite = !result.isFavorite;

    this.newItemEvent.emit(result);
  }

  public conditionalIsFavorite(result: any): void {
    if (!result.isFavorite) {
      this.addResultToFavorites(result, this._ls.getItem('favorites'));
    } else {
      this.takeOutResultToFavorites(result, this._ls.getItem('favorites'));
    }

  }


}
