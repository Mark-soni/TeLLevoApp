import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  cliente: string

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cliente = this.activatedRoute.snapshot.paramMap.get("user")
  }

}
