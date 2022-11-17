import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2'
import { MenuController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { HomeService } from '../home/home.service';
import { Homec } from './homec';
import { TranslateService } from '@ngx-translate/core';
declare var google;

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
})
export class HomeConductorPage implements OnInit {

  cliente: string
  conductor = []
  usuario: any;
  langs: string[] = [];

  constructor(private servicio: HomeService,
    private router: Router,
    private menu: MenuController,
    private activatedRoute: ActivatedRoute,
    private alerta: AlertController,
    private fire: FirebaseService,
    private translateService: TranslateService) {
      this.langs = this.translateService.getLangs();
    }

    


    ngOnInit() {
      //this.conductor = this.servicio.obtenerHomes()= ya no se usa
      //this.cliente = this.activatedRoute.snapshot.paramMap.get("user")= ya no se usa
      this.validacion();
  }

  ionViewWillEnter() {
    //this.conductor = this.servicio.obtenerHomes()= ya no se usa
    this.validacion();
  }

  validacion() {
    this.fire.obtenerUsuario().then(
      (resp) => {
        if (resp.emailVerified){
        this.obtenerHomec();
        this.usuario = resp.email;
      } else {
        this.mensajeError();
      }
      },
      (err) => {
        
      }
    )
  }

  async mensajeError() {
    const alert = await this.alerta.create({
      header: 'Error',
      message: 'Para poder usar la app, debe validar el correo',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });
  
    await alert.present();
  }

  obtenerHomec() {
    this.fire.getCollection<HomeConductorPage>('conductor').subscribe(
      (res) => {
        this.conductor = res;
        console.log(res)
      },
      (err) => {

      }
    )
  }

  async agregar() {
    //console.log("agregar")
    const alert = await this.alerta.create({
      header: 'Agregar Personaje!',
      inputs: [
        {
          name: 'txtNombre',
          placeholder: 'Nombre'
        },
        {
          name: 'txtPatente',
          placeholder: 'Patente'
        },
        {
          name: 'txtImagen',
          placeholder: 'Imagen'
        },
        {
          name: 'txtPrecio',
          placeholder: 'Precio'
        },
        {
          name: 'txtCapacidad',
          placeholder: 'Capacidad'
        },
        {
          name: 'txttipoAuto',
          placeholder: 'tipoAuto'
        },
        {
          name: 'txthora',
          placeholder: 'hora'
        },
        {
          name: 'txtArea',
          placeholder: 'area'
        },
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'canel',
        },
        {
          text: 'Guardar',
          handler: data => {
            //(No se usan mas) this.servicio.agregarHome(data.txtId,data.txtNombre,data.txtPatente,data.txtImagen,data.txtPrecio,data.txtCapacidad,data.txtTipoAuto,data.txtHora,data.txtArea)
            //(No se usan mas) this.ionViewWillEnter();
            const homc : Homec = {
              id        : this.fire.getId(),
              nombre    : data.txtNombre,
              patente   : data.txtPatente,
              imagen    : data.txtImagen,
              precio    : data.txtPrecio, 
              capacidad : data.txtCapacidad, 
              tipoAuto  : data.txtTipoAuto,
              hora      : data.txtHora,
              area      : data.txtArea
          }
            this.fire.cargarLoading("Almacenando personaje...")
            this.fire.createDoc(homc, 'Homec', homc.id).then(
              (res) => {
                this.fire.cerrarLoading()
                this.fire.mensaje("Conductor almacenado!")
              }
            )
          },
        },
      ],
    });
      
    await alert.present();
}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async logout() {
    this.fire.logout();
    this.router.navigate(['/login']);
  }

  //doStart(event) {
    //console.log('Estoy en start');

  //}
  
  //doPull(event) {
    //console.log('Estoy en pull');
  //}

  //doRefresher(event) {
    //console.log('Estoy en refresher');
    //console.log('Begin async operation');
    
    //setTimeout(() => {
      //console.log('Async operation has ended');
    //event.target.complete();
    //}, 2000);
  //}


}
