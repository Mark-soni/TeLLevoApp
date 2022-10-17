import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pass-resset',
  templateUrl: './pass-resset.page.html',
  styleUrls: ['./pass-resset.page.scss'],
})
export class PassRessetPage implements OnInit {

  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Correo Enviado',
      message: 'Le hemos enviado una nueva contraseña',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
