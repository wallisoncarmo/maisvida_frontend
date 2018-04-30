import { EspecialidadeDTO } from './../../models/especialidade.dto';
import { EspecialidadeService } from './../../services/domain/especialidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { MedicoService } from '../../services/domain/medico.service';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-novo-medico',
  templateUrl: 'novo-medico.html',
})
export class NovoMedicoPage {

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
      first_name: ['Wallison', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      last_name: ['Carmo Costa', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['wallison@gmail.com', [Validators.required, Validators.email]],
      especialidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      active: [true, [Validators.required]],
      status: [true, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estado.setValue(this.estados[0]);
        this.updateCidades();
      },
        error => { }
      );

    this.especialidadeService.findAll()
      .subscribe(response => {
        this.especialidades = response;
      },
        error => { }
      );
  }

  updateCidades() {

    let estado = this.formGroup.value.estado.id;
    this.cidadeService.findAll(estado)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidade.setValue(null);
      },
        error => { });
  }

  save() {

    this.medicoService.insert(this.formGroup.value).subscribe(res => {
      this.showInsertOk();
    }, error => { });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Cadastrado com sucesso',
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
