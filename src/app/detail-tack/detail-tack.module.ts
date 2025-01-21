import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailTackPageRoutingModule } from './detail-tack-routing.module';
import { DetailTackPage } from './detail-tack.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailTackPageRoutingModule
  ],
  declarations: [DetailTackPage]
})
export class DetailTackPageModule {}
