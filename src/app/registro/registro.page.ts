import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { GuardarService } from '../services/guardar.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private servicio: FirebaseService, private router: Router, private guardar: GuardarService ) { }

  ngOnInit() {
  }

  async registrar(user, email, pass, tipo) {
    try{
      const aux = this.servicio.registrar2(user.value, email.value, pass.value, tipo.value)
      if (aux) {
        //this.guardar.guardarU(user.value, email.value, pass.value, tipo.value)
        console.log(user)
        this.servicio.mensaje('El usuario a sido creado existosamente')
      }
    } catch (error){
      console.log('Error->',error)
    }
  }

  //async guardarU(user, email, pass, tipo) {
    //this.guardar.guardarU(user.value, email.value, pass.value, tipo.value)
    //console.log(tipo.value);
  //}
  
}

