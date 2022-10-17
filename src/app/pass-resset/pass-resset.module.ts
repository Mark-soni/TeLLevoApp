import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassRessetPageRoutingModule } from './pass-resset-routing.module';

import { PassRessetPage } from './pass-resset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassRessetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PassRessetPage]
})
export class PassRessetPageModule {}
