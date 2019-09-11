import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReference } from '@angular/fire/firestore';
import { MetricaproyectoproductoViewModel } from '../models/metricaproyectoproducto-view-model';
import { MetricaproyectoproductoService } from '../services/metricaproyectoproducto.service';
import { Metricaproyectoproducto } from '../models/metricaproyectoproducto';

import { TipodatovalidoService } from '../services/tipodatovalido.service';
import { TipodatovalidoViewModel } from '../models/tipodatovalido-view-model';

@Component({
  selector: 'app-metricas-pro-form',
  templateUrl: './metricas-pro-form.component.html',
  styleUrls: ['./metricas-pro-form.component.css']
})
export class MetricasProFormComponent implements OnInit {

  metricaForm: FormGroup; //Variable necesaria para la creación de un modal
  createMode: boolean = true; //Variable para indicar si el titulo del modal sera de creación o de edición
  metricapp: MetricaproyectoproductoViewModel;

  /*Variables necesarias para tomar los datos del objeto mandado 
  en el componente anterior y utilizarlas como valor predeterminado 
  en los select*/
  public datovalidoS: String;
  public obligatorioS: String;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public tipodatovalidoService: TipodatovalidoService,
    public metricappService: MetricaproyectoproductoService) { }

 //Validadores (valores de llanado obligatorio) 
 ngOnInit() {
  this.metricaForm = this.formBuilder.group({
    datovalido: ['',],
    obligatorio: ['',]
      });


  if (!this.createMode) {
    this.loadMetrica(this.metricapp);
  }

  this.loadTipos();
  
}

//Carga de la información en caso de edición
loadMetrica(metricapp){
  this.metricaForm.patchValue(metricapp)
  //Asignación de valores predeterminados para los select
  this.datovalidoS = metricapp.datovalido;
  this.obligatorioS = metricapp.obligatorio;
}

//Consulta todos los tipos de datos validos para el select
tipos: TipodatovalidoViewModel[] = [];
loadTipos() {
    this.tipodatovalidoService.getDatos().subscribe(response => {
      this.tipos = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const tipo: TipodatovalidoViewModel = {
          id: id,      
          descripcion: data.descripcion
        };
        this.tipos.push(tipo);
      });
    });
  }

   //Funcion encargada la recibir valores del select y ejecución del servicio
   saveMetrica() {
    if (this.metricaForm.invalid) {
      return;
    }
    //Caso creación de registro
    if (this.createMode){
    } 
    //Caso edición de registro
    else{
      let metricapp: MetricaproyectoproductoViewModel = this.metricaForm.value;
      metricapp.id = this.metricapp.id;
      /*Las varibales acontonuación declaradas se vuelven a enviar debido a que el formulario
      y el componente de la tabla usan el mismo ViewModel y al regresar a la tabla no se 
      refresca la vista por si sola*/
      metricapp.proyectodsc = this.metricapp.proyectodsc;
      metricapp.productodsc = this.metricapp.productodsc;
      metricapp.metricadsc = this.metricapp.metricadsc;
      metricapp.datovalidotipo = this.metricapp.datovalidotipo;
      //Terminan variables a enviar
      this.metricappService.editMetricaPP(metricapp)
        .then(() => this.handleSuccessfulEditMetricaPP(metricapp))
        .catch(err => console.error(err));
    }

  }

  handleSuccessfulSaveMetricaPP(response: DocumentReference, metricapp: Metricaproyectoproducto) {
    this.activeModal.dismiss({ metricapp: metricapp, id: response.id, createMode: true});
  }


  handleSuccessfulEditMetricaPP(metricapp: MetricaproyectoproductoViewModel) {
    this.activeModal.dismiss({ metricapp: metricapp, id: metricapp.id, createMode: false });
  }

}
