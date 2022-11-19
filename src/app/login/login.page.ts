import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuariotemporal } from '../interfaces/usuariotemporal';
import { FirebaseService } from '../services/firebase.service';
//import { LoginService } from './login.service';
import { Usuario } from './usuario';
import * as firebase from "firebase/auth"
import { AuthProvider, getAuth } from 'firebase/auth';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuariotemporal
  private usuarios = []
  mensaje: string
  langs: string[] = [];
  claseMensaje   : string
  msg : string
  creacionAlert : string
  suxAlert : string

  //private servicio: LoginService

  constructor(
              private servicio: FirebaseService, 
              private router: Router, 
              private translateService: TranslateService) {
                this.langs = this.translateService.getLangs();
              }

  ngOnInit() {
    this.obtenerUsuario();
    this.verificarLogin();
  }

  changeLang(event) {
    this.translateService.use(event.detail.value);
    //console.log(event.detail.value)
  }

  async verificarLogin(){
    const auth = getAuth();
    firebase.onAuthStateChanged(auth,function(user) {
      if (user) {
        console.log('Usuario inciado :',user.displayName)
      }else {
        console.log('Error')
      }
    });
  }

  async onGitHubLogin() {
    var provider = new firebase.GithubAuthProvider();
    const auth = getAuth();
    firebase.signInWithPopup(auth,provider).then(
      (res) => {
        this.router.navigate(['/home'])
        this.servicio.verificacion()
        console.log('User->', res.user)
      },
      (err) => {
        console.log('Error->', err)
      }
    )
  }

  



  onGoogleLogin() {
    var provider = new firebase.GoogleAuthProvider();
    const auth = getAuth();
    firebase.signInWithPopup(auth,provider).then(
      (res) => {
        this.router.navigate(['/home'])
        this.servicio.verificacion()
        console.log('User->', res.user)
      },
      (err) => {
        console.log('Error->', err)
      }
    )
  }

  async login(email, pass) {
    this.usuario = this.obtenerUsEs(email.value, pass.value)
    console.log(this.usuario)
    if (this.usuario.email === email.value && this.usuario.pass === pass.value && this.usuario.tipo === "Pasajero") {
      this.loginFire(this.usuario.email, this.usuario.pass)
      this.router.navigate(['/home']); 
    } else if ( this.usuario.email === email.value && this.usuario.pass === pass.value && this.usuario.tipo === 'Conductor'){
      this.loginFire(this.usuario.email,this.usuario.pass)
      this.router.navigate(['/home-conductor'])
    } else {
      this.servicio.mensaje('Error en la credenciales')
    }
  }

  //Dudas
  async obtenerPalabrasAlert() {
    this.translateService.get('Cuenta Registrada en la base de datos').subscribe(
      (res: string) => {
        this.msg = res
      }
    )
    this.translateService.get('Creación de cuenta').subscribe(
      (res: string) => {
        this.creacionAlert = res
      }
    )
    this.translateService.get('Se ha creado su cuenta').subscribe(
      (res: string) => {
        this.suxAlert = res
      }
    )
  }

  async registrar(nombre, email, pass) {
    try{
      const user = this.servicio//.registrar(email.value,pass.value)
      if (user) {
        console.log('User->',user)
        //this.presentAlert();
        //this.guard.GuardarServicio(nombre.value,email.value,pass.value)
        this.servicio.mensaje(this.msg)
        console.log('value->')
      } 
    }catch (error){
      console.log('Error->',error)
    }
  }

  //Dudas

  async loginFire(email, pass) {
    try {
      const user = this.servicio.login(email, pass)
      if (user) {
        console.log(user)
        this.router.navigate(['/home-conductor']);
      }
    } catch (error){
      console.log(error)
    }
  }

  private obtenerUsuario() {
    this.servicio.getCollection<Usuariotemporal>('UsuarioDuoc').subscribe(
      (res) => {
        console.log(res)
        this.usuarios = (res)
      },
      (err) => {
        console.log(err)
      }  
    )
  }

  private obtenerUsEs(email: string, pass: string) {
    return{
      ...this.usuarios.find(aux => {
        return aux.email === email && aux.pass === pass
      })
    }
  }

}


  


