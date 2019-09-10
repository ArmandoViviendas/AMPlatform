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

  marcaForm: FormGroup; //Variable necesaria para la creación de un modal
  createMode: boolean = true; //Variable para indicar si el titulo del modal sera de creación o de edición
  marca: MarcaViewModel; //Interfaz para creación o modificación del registro según el caso

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private marcaService: MarcaService) { }

  //Validadores (valores de llanado obligatorio) 
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

  //Carga de la información en caso de edición
  loadMarca(marca){
    this.marcaForm.patchValue(marca)
  }

  //Funcion encargada la recibir valores del select y ejecución del servicio
  saveMarca(planid: string,plandsc:string) {
    if (this.marcaForm.invalid) {
      return;
    }
    //Caso creación de registro
    if (this.createMode){
      let marca: Marca = this.marcaForm.value;
      marca.planid = planid;
      marca.plandsc = plandsc;
      this.marcaService.saveMarca(marca)
      .then(response => this.handleSuccessfulSaveMarca(response, marca))
      .catch(err => console.error(err));
    } 
    //Caso edición de registro
    else{
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
