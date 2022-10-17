import { Injectable } from '@angular/core';
import { Homes } from './homes';
import { MenuController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private conductor: Homes[] = [
    {
      id        : '1',
      nombre    : 'Amasino Roberto',
      patente   : 'SG●15●77',
      imagen    : 'assets/citycar.jpg',
      precio    : '$5.000',
      capacidad : '3',
      tipoAuto  : 'City car',
      hora      : '12:15',
      area      : 'Puente alto'
    },
    {
      id        : '2',
      nombre    : 'Santa Klaus',
      patente   : 'KJ●27●66',
      imagen    : 'assets/Sedan.png',
      precio    : '$8.000',//number
      capacidad : '4',     //number para el futuro yo
      tipoAuto  : 'Sedan ',
      hora      : '11:00',
      area      : 'Puente alto'
    },
    {
      id        : '3',
      nombre    : 'Angelo Mori',
      patente   : 'DS●55●47',
      imagen    : 'assets/funeraria.png',
      precio    : '$12.000',
      capacidad : '6',
      tipoAuto  : 'Suv car ',
      hora      : '10:30',
      area      : 'Puente alto'
    },
    {
      id        : '4',
      nombre    : 'Delcik Joaking',
      patente   : 'VP●13●09',
      imagen    : 'assets/sedane.png',
      precio    : '$7.000',
      capacidad : '4',
      tipoAuto  : 'Sedan electrico ',
      hora      : '13:15',
      area      : 'Puente alto'
    }
  ]

  
  constructor() { }

  obtenerHomes() {
    return [...this.conductor]
  }

  obtenerHome(id: string) {
    return {
      ...this.conductor.find(aux => {
        return aux.id === id
      })
    }
  }

  agregarHome(nombre: string, patente: string, imagen: string, precio: string, capacidad: string, tipoAuto: string, hora: string, area: string) {
    this.conductor.push({
      nombre, patente, imagen, precio, capacidad, tipoAuto, hora , area , id: this.conductor.length + 1 + ""
    })
  }

  eliminarHome(id: string) {
    this.conductor = this.conductor.filter(aux => {
      return aux.id !== id 
    })
  }

}
