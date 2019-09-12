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
  public datovalidoS = {id:null,descripcion:null,tipo:null}

  public obligatorioS: String;
  public datovalidoSId: String;


  //Variables para extraer del select tipo dato valido
  id_dato: string;
  descripcion_dato: string;
  tipo_dato: string;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public tipodatovalidoService: TipodatovalidoService,
    public metricappService: MetricaproyectoproductoService) { }

 //Validadores (valores de llanado obligatorio) 
 ngOnInit() {
  this.metricaForm = this.formBuilder.group({
    datovalido: ['',],
    obligatorio: ['',],
    datovalidoid: ['',]
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
    this.datovalidoS.id = metricapp.datovalidoid;
    this.datovalidoS.descripcion = metricapp.datovalido;
    this.datovalidoS.tipo = metricapp.datovalidotipo;

  console.log("default",this.datovalidoS);
  this.obligatorioS = metricapp.obligatorio;
  console.log("default",this.obligatorioS);
  
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
          descripcion: data.descripcion,
          tipo: data.tipo
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

      //Variable para almacenar objeto de dato tipo valido
      let datos = this.metricaForm.value.datovalido;

      /*Si el tipo de dato es undefinido significa que no selecciono ninguna opcion
      y  se procede a utilizar los datos mandados desde el componente anterior*/
      if (datos.tipo != null){
      this.id_dato = datos.id;
      this.descripcion_dato = datos.descripcion;
      this.tipo_dato = datos.tipo;
      console.log("Antes del servicio",datos);

      }else{
        this.id_dato = this.datovalidoS.id;
        this.descripcion_dato = this.datovalidoS.descripcion;
        this.tipo_dato = this.datovalidoS.tipo;
        console.log("Antes del servicio",this.datovalidoS);
      }

      metricapp.id = this.metricapp.id;
      /*Las varibales acontonuación declaradas se vuelven a enviar debido a que el formulario
      y el componente de la tabla usan el mismo ViewModel y al regresar a la tabla no se 
      refresca la vista por si sola*/
      metricapp.proyectodsc = this.metricapp.proyectodsc;
      metricapp.productodsc = this.metricapp.productodsc;
      metricapp.metricadsc = this.metricapp.metricadsc;

      //Datos asignados por el select de dato valido
      metricapp.datovalidoid = this.id_dato
      metricapp.datovalido = this.descripcion_dato;
      metricapp.datovalidotipo = this.tipo_dato;
        
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
