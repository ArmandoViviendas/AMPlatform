import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReference } from '@angular/fire/firestore';
import { MetricaViewModel } from '../models/metrica-view-model';
import { MetricaService } from '../services/metrica.service';
import { Metrica } from '../models/metrica';

@Component({
  selector: 'app-metricas-form',
  templateUrl: './metricas-form.component.html',
  styleUrls: ['./metricas-form.component.css']
})
export class MetricasFormComponent implements OnInit {

  metricaForm: FormGroup; //Variable necesaria para la creación de un modal
  createMode: boolean = true;//Variable para indicar si el titulo del modal sera de creación o de edición
  metrica: MetricaViewModel;//Interfaz para creación o modificación del registro según el caso

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private metricaService: MetricaService) { }

    //Validadores (valores de llanado obligatorio)  
  ngOnInit() {
    this.metricaForm = this.formBuilder.group({
      metricadsc: ['', Validators.required],
      tipo: ['', Validators.required],
      activo: ['', Validators.required],
        });

    if (!this.createMode) {
      this.loadMetrica(this.metrica); 
    }
  }

  //Carga de la información en caso de edición
  loadMetrica(metrica){
    this.metricaForm.patchValue(metrica)
  }

  //Funcion encargada la recibir valores del select y ejecución del servicio
  saveMetrica(planid: string,plandsc:string,clienteid: string, clientedsc: string) {
    if (this.metricaForm.invalid) {
      return;
    }

    //Caso creación de registro
    if (this.createMode){
      let metrica: Metrica = this.metricaForm.value;
      metrica.planid = planid;
      metrica.plandsc = plandsc;
      metrica.clienteid = clienteid;
      metrica.clientedsc = clientedsc;
      this.metricaService.saveMetrica(metrica)
      .then(response => this.handleSuccessfulSaveMetrica(response, metrica))
      .catch(err => console.error(err));
    }
    //Caso edición de registro 
    else{
      let metrica: MetricaViewModel = this.metricaForm.value;
      metrica.id = this.metrica.id;
      this.metricaService.editMetrica(metrica)
        .then(() => this.handleSuccessfulEditMetrica(metrica))
        .catch(err => console.error(err));
    }

  }
  handleSuccessfulSaveMetrica(response: DocumentReference, metrica: Metrica) {
    this.activeModal.dismiss({ metrica: metrica, id: response.id, createMode: true});
  }

  handleSuccessfulEditMetrica(metrica: MetricaViewModel) {
    this.activeModal.dismiss({ metrica: metrica, id: metrica.id, createMode: false });
  }


}
