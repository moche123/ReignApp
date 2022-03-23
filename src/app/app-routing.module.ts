import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavesComponent } from './pages/faves/faves.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderTabsComponent } from './partials/header-tabs/header-tabs.component';


const routes: Routes = [
  {
    path:'app', component:HeaderTabsComponent,
    children:[
      {
        path:'main', component:MainComponent
      },
      {
        path: 'faves', component: FavesComponent
      },
      {
        path:'**', redirectTo:'main', pathMatch:'full'
      },
      {
        path:'', redirectTo:'main', pathMatch:'full'
      }
    ]
  },
 
  {
    path:'', redirectTo:'app', pathMatch:'full'
  },
  {
    path:'**', redirectTo:'app', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
