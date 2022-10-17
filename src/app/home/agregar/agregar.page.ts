import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  constructor(private servicio: HomeService, private router: Router,private alertController: AlertController) { }

  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Su viaje se programo',
      message: 'Su viaje esta publicado',
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
  }
  guardar(txtNombre,txtPatente,txtImagen,txtPrecio,txtCapacidad,txtAuto,txtHora,txtArea) {
    console.log("guardar")
    this.servicio.agregarHome(txtNombre.value,txtPatente.value,txtImagen.value,txtPrecio.value,txtCapacidad.value,txtAuto.value,txtHora.value,txtArea.value)
    this.router.navigate(['/home'])
    
  }

}
