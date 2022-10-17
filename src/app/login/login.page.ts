import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
//import { LoginService } from './login.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario
  mensaje: string
  claseMensaje   : string

  //private servicio: LoginService

  constructor(private servicio: FirebaseService, private router: Router,
              ) { }

  ngOnInit() {
  }


  async login(email, pass) {
    const user = this.servicio.login(email.value, pass.value);
    if (user) {
      this.router.navigate(['/home']);
    }
  }
}

  //login(txtUser,txtPass) {
    //this.usuario = this.servicio.obtenerUsuario(txtUser.value,txtPass.value)
    //if ( this.usuario.user === txtUser.value && this.usuario.pass === txtPass.value && this.usuario.tipo === "cliente"){
      //this.router.navigate(['/home',txtUser.value])
    //}else if (this.usuario.user === txtUser.value && this.usuario.pass === txtPass.value && this.usuario.tipo ==="admin"){
      //this.router.navigate(['/home',txtUser.value])
    //}else if (this.usuario.user === txtUser.value && this.usuario.pass === txtPass.value && this.usuario.tipo ==="conductor"){
      //this.router.navigate(['/home-conductor',txtUser.value])
    //} else {
      //this.mensaje = "Error de credencial al ser ingresada"
      //this.claseMensaje = "padcor"
    //}
  //}
//}