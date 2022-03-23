import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { FavesComponent } from './pages/faves/faves.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderTabsComponent } from './partials/header-tabs/header-tabs.component';
import { PaginationComponent } from './partials/pagination/pagination.component';
import { ArrangedatePipe } from './pipes/arrangedate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FavesComponent,
    HeaderTabsComponent,
    PaginationComponent,
    ArrangedatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
