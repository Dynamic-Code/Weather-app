import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreDetailsComponent } from './more-details/more-details.component';

const routes: Routes = [
  {path:'moredetails',component:MoreDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
