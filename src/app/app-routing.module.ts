import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'shopping-list', component: ShoppingListComponent },
//   { path: 'tips', component: TipComponent },
//   { path: 'home', component: HomePageComponent },
//   { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
