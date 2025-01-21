import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailTackPage } from './detail-tack.page';

const routes: Routes = [
  {
    path: '',
    component: DetailTackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailTackPageRoutingModule {}
