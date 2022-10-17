import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-pass-resset',
  templateUrl: './pass-resset.page.html',
  styleUrls: ['./pass-resset.page.scss'],
})
export class PassRessetPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private servicio: FirebaseService) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Correo Enviado',
      message: 'Le hemos enviado una nueva contraseña',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async onReset(email) {
    if ((email.value).length === 0) {

    }else {

      this.servicio.recuperar(email.value)
      await this.presentAlert();
      await this.router.navigate(['home'])
    }
  }

  

}
