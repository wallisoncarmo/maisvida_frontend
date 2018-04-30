import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMedicoPage } from './edit-medico';

@NgModule({
  declarations: [
    EditMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMedicoPage),
  ],
})
export class EditMedicoPageModule {}
