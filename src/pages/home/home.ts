import { MedicoDTO } from './../../models/medico.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { MedicoService } from '../../services/domain/medico.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: MedicoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public medicoService: MedicoService,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {

    let loading = this.presentLoading();

    this.medicoService.findAll(null,this.page, 10).subscribe(res => {

      this.items = this.items.concat(res['content']);
      loading.dismiss();

    }, error => {
      this.items = [];
      loading.dismiss();

    });

  };

  showDetail(id: string) {
    this.navCtrl.push('DetalhePage', { id: id });
  }

  showFormMedico() {
    this.navCtrl.push('NovoMedicoPage');
  }

  showEdit(id: string) {
    this.navCtrl.push('EditMedicoPage', { id: id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }  

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
