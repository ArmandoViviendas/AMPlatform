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

  metricaForm: FormGroup;
  createMode: boolean = true;
  metrica: MetricaViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private metricaService: MetricaService) { }

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

  loadMetrica(metrica){
    this.metricaForm.patchValue(metrica)
  }

  saveMetrica(planid: string,plandsc:string,clienteid: string, clientedsc: string) {
    if (this.metricaForm.invalid) {
      return;
    }

    if (this.createMode){
      let metrica: Metrica = this.metricaForm.value;
      metrica.planid = planid;
      metrica.plandsc = plandsc;
      metrica.clienteid = clienteid;
      metrica.clientedsc = clientedsc;
      this.metricaService.saveMetrica(metrica)
      .then(response => this.handleSuccessfulSaveMetrica(response, metrica))
      .catch(err => console.error(err));
    } else{
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
