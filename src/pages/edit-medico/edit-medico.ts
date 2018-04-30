import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MedicoService } from '../../services/domain/medico.service';
import { MedicoDTO } from '../../models/medico.dto';
import { EspecialidadeDTO } from '../../models/especialidade.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EspecialidadeService } from '../../services/domain/especialidade.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-edit-medico',
  templateUrl: 'edit-medico.html',
})
export class EditMedicoPage {

  item: MedicoDTO;
  formGroup: FormGroup;
  estados: EstadoDTO[];
  especialidades: EspecialidadeDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public especialidadeService: EspecialidadeService,
    public medicoService: MedicoService,
    public estadoService: EstadoService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      id: [this.navParams.get('id'), [Validators.required]],
      first_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      last_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      estado: [null, []],
      cidade: [null, [Validators.required]],
      especialidade: [null, [Validators.required]],
      active: [true, [Validators.required]],
      status: [true, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');
    this.medicoService.findById(id).subscribe(res => {

      this.item = res;
      
      this.formGroup.controls.first_name.setValue(this.item.first_name ? this.item.first_name : '');
      this.formGroup.controls.last_name.setValue(this.item.last_name ? this.item.last_name : this.item.lastName);
      this.formGroup.controls.email.setValue(this.item.email ? this.item.email : '');
      this.formGroup.controls.estado.setValue(this.item.cidade.estado ? this.item.cidade.estado : null);
      this.formGroup.controls.cidade.setValue(this.item.cidade.id ? this.item.cidade : null);
      this.formGroup.controls.especialidade.setValue(this.item.especialidade ? this.item.especialidade : null);
      this.formGroup.controls.active.setValue(this.item.active ? this.item.active : false);
      this.formGroup.controls.status.setValue(this.item.status ? this.item.active : false);

      this.estadoService.findAll()
        .subscribe(res => {
          this.estados = res;
          if (this.item.cidade.estado.id) {
            this.updateCidades();
          }
        },
          error => { }
        );

      this.especialidadeService.findAll()
        .subscribe(res => {
          this.especialidades = res;
        },
          error => { }
        );

    }, error => {
      this.navCtrl.pop();
    });

  }

  updateCidades() {
    let estado = this.formGroup.value.estado.id;
    this.cidadeService.findAll(estado)
      .subscribe(cidade => {
        this.cidades = cidade;
        this.formGroup.controls.cidade.setValue(null);

      },
        error => { });
  }

  save() {
    this.medicoService.update(this.formGroup.value).subscribe(res => {
      this.showInsertOk();
    }, error => { });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Atualizado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        },
      ]
    });
    alert.present();
  }

}
