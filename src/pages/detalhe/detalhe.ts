import { MedicoDTO } from './../../models/medico.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicoService } from '../../services/domain/medico.service';

/**
 * Generated class for the DetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
})
export class DetalhePage {

  item: MedicoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public medicoService: MedicoService) {

  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');
    this.medicoService.findById(id).subscribe(res => {
      this.item = res;
    }, error => {
      this.navCtrl.pop();
    });

  }


  changeStatus(active: boolean ){
    this.item.active=active;
  }

  showEdit(id: string) {
    this.navCtrl.push('EditMedicoPage', { id: id });
  }


}
