import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReference } from '@angular/fire/firestore';
import { MarcaViewModel } from '../models/marca-view-model';
import { MarcaService } from '../services/marca.service';
import { Marca } from '../models/marca';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marcas-form.component.html',
  styleUrls: ['./marcas-form.component.css']
})
export class MarcasFormComponent implements OnInit {

  marcaForm: FormGroup;
  createMode: boolean = true;
  marca: MarcaViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private marcaService: MarcaService) { }

  ngOnInit() {
    this.marcaForm = this.formBuilder.group({
      marcadsc: ['', Validators.required],
      propiacompetencia: ['', Validators.required],
      activo: ['', Validators.required]
        });

    if (!this.createMode) {
      this.loadMarca(this.marca); 
    }
  }

  loadMarca(marca){
    this.marcaForm.patchValue(marca)
  }

  saveMarca(planid: string,plandsc:string) {
    if (this.marcaForm.invalid) {
      return;
    }

    if (this.createMode){
      let marca: Marca = this.marcaForm.value;
      marca.planid = planid;
      marca.plandsc = plandsc;
      this.marcaService.saveMarca(marca)
      .then(response => this.handleSuccessfulSaveMarca(response, marca))
      .catch(err => console.error(err));
    } else{
      let marca: MarcaViewModel = this.marcaForm.value;
      marca.id = this.marca.id;
      this.marcaService.editMarca(marca)
        .then(() => this.handleSuccessfulEditMarca(marca))
        .catch(err => console.error(err));
    }

  }
  handleSuccessfulSaveMarca(response: DocumentReference, marca: Marca) {
    this.activeModal.dismiss({ marca: marca, id: response.id, createMode: true});
  }

  handleSuccessfulEditMarca(marca: MarcaViewModel) {
    this.activeModal.dismiss({ marca: marca, id: marca.id, createMode: false });
  }




}
