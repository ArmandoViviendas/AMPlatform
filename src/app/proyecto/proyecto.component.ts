import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../shared/services/proyecto/proyecto.service';
import { ProyectoInterface } from '../models/proyecto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  constructor(private proyectoservice: ProyectoService) {}
  private ProyectoI: ProyectoInterface[]; 

  ngOnInit() {
    this.getListProyectos();
  }

  getListProyectos(){
    this.proyectoservice.getAllProyectos().subscribe(response => {
      this.ProyectoI = response;
    })
  }

  onDeleteProyecto(idP: string){
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.proyectoservice.deleteProyecto(idP);
    }
  }

  onPreUpdateProyecto(proyecto: ProyectoInterface){
    this.proyectoservice.selectedProyecto = Object.assign({}, proyecto);
  }

}
