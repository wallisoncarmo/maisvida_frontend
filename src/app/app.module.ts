import { EspecialidadeService } from './../services/domain/especialidade.service';
import { EstadoService } from './../services/domain/estado.service';
import { CidadeService } from './../services/domain/cidade.service';
import { MedicoService } from './../services/domain/medico.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { StorageService } from '../services/storage.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    MedicoService,
    CidadeService,
    EstadoService,
    EspecialidadeService
  ]
})
export class AppModule {}
