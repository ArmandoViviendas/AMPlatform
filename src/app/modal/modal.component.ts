import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';
import { CInterface } from '../models/corporativo';
import { NgForm } from '@angular/forms';

/** cliente */
import { ClienteService } from '../shared/services/clientes/cliente.service';
import { ClienteInterface } from '../models/cliente';

/** Plan */
import { PlanService } from '../shared/services/plan/plan.service';
import { PlanInterface } from '../models/plan';

/** Proyecto */
import { ProyectoService } from '../shared/services/proyecto/proyecto.service';
import { ProyectoInterface } from '../models/proyecto';

/** Cadena */
import { CadenaService } from '../shared/services/cadenas/cadena.service';
import { CadenaInterface } from '../models/cadena';


/** Formato */
import { FormatoService } from '../shared/services/formato/formato.service';
import { FormatoInterface } from '../models/formato';

/** Canal */
import { CanalService } from '../shared/services/canal/canal.service';
import { CanalInterface } from '../models/canal';

/** Estado */
import { EstadoService } from '../shared/services/estados/estado.service';
import { EstadoInterface } from '../models/estado';

/** Ciudad */
import { CiudadService } from '../shared/services/ciudades/ciudad.service';
import { CiudadInterface } from '../models/ciudad';

/** Region */
import { RegionService } from '../shared/services/regiones/region.service';
import { RegionInterface } from '../models/region';

/** Tienda */
import { TiendaService } from '../shared/services/tiendas/tienda.service';
import { TiendaInterface } from '../models/tienda';
import { StringifyOptions } from 'querystring';

/** Ruta  */
import { RutaService } from '../shared/services/rutas/ruta.service';
import { RutaInterface } from '../models/rutas';

/** Usuario */
import { AuthService } from '../shared/services/auth.service';
import { User } from "../shared/services/user";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private corporaticoS: CorporativoService,
    private clienteservice: ClienteService,
    private planservice: PlanService,
    private proyectoservice: ProyectoService,
    private cadenaservice: CadenaService,
    private formatoservice: FormatoService,
    private canalservice: CanalService,
    private estadoservice: EstadoService,
    private ciudadservice: CiudadService,
    private regionservice: RegionService,
    private tiendaservice: TiendaService,
    private rutaservice: RutaService
    ) {}

    private canalI: CanalInterface[];
    private cadenaI: CadenaInterface[];
    private formatoI: FormatoInterface[];
    private estadoI: EstadoInterface[];
    private ciudadI: CiudadInterface[];
    private regionI: RegionInterface[];
    private proyectoI: ProyectoInterface[];
    private rutaI: RutaInterface[];
    private tiendaI: TiendaInterface[];

    public selectedCanal: any = 'Seleccionar Canal';
    public selectedCadena: any = 'Seleccionar Cadena';
    public selectedFormato: any = 'Seleccionar Formato';
    public selectedEstado: any = 'Seleccionar Estado';
    public selectedCiudad: any = 'Seleccionar Ciudad';
    public selectedRegion: any = 'Seleccionar Region';

    public selectedProyecto: any = 'Seleccionar Proyecto';
    public selectedTienda: any = 'Seleccionar Tienda';

    public cadenaid: string;
    public cadenadsc: string;
    public formatoid: string;
    public formatodsc: string;
    public estadoid: string;
    public estadodsc: string;
    public ciudadid: string;
    public ciudaddsc: string;
    public canalid: string;
    public canaldsc: string;
    public regionid: string;
    public regiondsc: string;
    public sucursal: string;
    public calle: string;
    public colonia: string;
    public cp: string;

    public proyectodsc: string;
    public idproyecto: string;

  ngOnInit() {
    this.getListTienda();
    this.getListProyecto();
  }

  //corporativo
  onSaveCorporativo(corporativoForm: NgForm): void {
    if (corporativoForm.value.idC == null){
      //guardar
      this.corporaticoS.addCorporativo(corporativoForm.value);
    }else {
      //modificar
      this.corporaticoS.updateCorporativo(corporativoForm.value);
    }
  }

  //cliente
  onSaveCliente(clienteForm: NgForm): void {
    if (clienteForm.value.idC == null){
      //guardar
      this.clienteservice.addCliente(clienteForm.value);
    }else {
      //modificar
      this.clienteservice.updateCliente(clienteForm.value);
    }
  }

  //plan
  onSavePlan(planForm: NgForm): void {
    if (planForm.value.idP == null){
      //guardar
      this.planservice.addPlan(planForm.value);
    }else {
      //modificar
      this.planservice.updatePlan(planForm.value);
    }
  }

  //proyecto
  onSaveProyecto(proyectoForm: NgForm): void {
    if (proyectoForm.value.idP == null){
      //guardar
      this.proyectoservice.addProyecto(proyectoForm.value);
    }else {
      //modificar
      this.proyectoservice.updateProyecto(proyectoForm.value);
    }
  }

  //cadena
  onSaveCadena(cadenaForm: NgForm): void {
    if (cadenaForm.value.idcadena == null){
      //guardar
      this.cadenaservice.addCadena(cadenaForm.value);
    }else {
      //modificar

      this.cadenaservice.updateCadena(cadenaForm.value);
    }
  }

  //cadena
  onSaveFormato(formatoForm: NgForm): void {
    if (formatoForm.value.idformato == null){
      //guardar
      this.formatoservice.addFormato(formatoForm.value);
    }else {
      //modificar

      this.formatoservice.updateFormato(formatoForm.value);
    }
  }

  //canal
  onSaveCanal(canalForm: NgForm): void {
    if (canalForm.value.idcanal == null){
      //guardar
      this.canalservice.addCanal(canalForm.value);
    }else {
      //modificar
      this.canalservice.updateCanal(canalForm.value);
    }
  }

  //estado
  onSaveEstado(estadoForm: NgForm): void {
    if (estadoForm.value.idestado == null){
      //guardar
      this.estadoservice.addEstado(estadoForm.value);
    }else {
      //modificar
      this.estadoservice.updateEstado(estadoForm.value);
    }
  }

  //ciudad
  onSaveCiudad(ciudadForm: NgForm): void {
    if (ciudadForm.value.idciudad == null){
      //guardar
      this.ciudadservice.addCiudad(ciudadForm.value);
    }else {
      //modificar
      this.ciudadservice.updateCiudad(ciudadForm.value);
    }
  }

  //Region
  onSaveRegion(regionForm: NgForm): void {
    if (regionForm.value.idregion == null){
      //guardar
      this.regionservice.addRegion(regionForm.value);
    }else {
      //modificar
      this.regionservice.updateRegion(regionForm.value);
    }
  }

  //Tienda
  onSaveTienda(tiendaForm: NgForm): void {
    let cadenaF = tiendaForm.value.idcadena;
    let formatoF = tiendaForm.value.idformato;
    let estadoF = tiendaForm.value.idestado;
    let ciudadF = tiendaForm.value.idciudad;
    let canalF = tiendaForm.value.idcanal;
    let regionF = tiendaForm.value.idregion;

    this.cadenaid = cadenaF.idcadena;
    this.cadenadsc = cadenaF.cadenadsc;
    this.formatoid = formatoF.idformato;
    this.formatodsc = formatoF.formatodsc;
    this.estadoid = estadoF.idestado;
    this.estadodsc = estadoF.estadodsc;
    this.ciudadid = ciudadF.idciudad;
    this.ciudaddsc = ciudadF.ciudaddsc;
    this.canalid = canalF.idcanal;
    this.canaldsc = canalF.canaldsc;
    this.regionid = regionF.idregion;
    this.regiondsc = regionF.regiondsc;

    tiendaForm.value.idcadena = this.cadenaid;
    tiendaForm.value.cadenadsc = this.cadenadsc;
    tiendaForm.value.idformato = this.formatoid;
    tiendaForm.value.formatodsc = this.formatodsc;
    tiendaForm.value.idestado = this.estadoid;
    tiendaForm.value.estadodsc = this.estadodsc;
    tiendaForm.value.idciudad = this.ciudadid;
    tiendaForm.value.ciudaddsc = this.ciudaddsc;
    tiendaForm.value.idcanal = this.canalid;
    tiendaForm.value.canaldsc = this.canaldsc;
    tiendaForm.value.idregion = this.regionid;
    tiendaForm.value.regiondsc = this.regiondsc;

    if (tiendaForm.value.idT == null){
      //guardar
      this.tiendaservice.addTienda(tiendaForm.value);
    }else {
      //modificar
      this.tiendaservice.updateTienda(tiendaForm.value);
    }
    
  }

  //ruta
  onSaveRuta(rutaForm: NgForm): void {
    let tiendaF = rutaForm.value.idtienda;
    let proyectoF = rutaForm.value.idproyecto;

    this.cadenaid = tiendaF.idcadena;
    this.cadenadsc = tiendaF.cadenadsc;
    this.formatoid = tiendaF.idformato;
    this.formatodsc = tiendaF.formatodsc;
    this.estadoid = tiendaF.idestado;
    this.estadodsc = tiendaF.estadodsc;
    this.ciudadid = tiendaF.idciudad;
    this.ciudaddsc = tiendaF.ciudaddsc;
    this.canalid = tiendaF.idcanal;
    this.canaldsc = tiendaF.canaldsc;
    this.regionid = tiendaF.idregion;
    this.regiondsc = tiendaF.regiondsc;
    this.sucursal = tiendaF.sucursal;
    this.calle = tiendaF.calle;
    this.colonia = tiendaF.colonia;
    this.cp = tiendaF.cp;
    this.idproyecto = proyectoF.idP;
    this.proyectodsc = proyectoF.proyectodsc;

    rutaForm.value.idcadena = this.cadenaid;
    rutaForm.value.cadenadsc = this.cadenadsc;
    rutaForm.value.idformato = this.formatoid;
    rutaForm.value.formatodsc = this.formatodsc;
    rutaForm.value.idestado = this.estadoid;
    rutaForm.value.estadodsc = this.estadodsc;
    rutaForm.value.idciudad = this.ciudadid;
    rutaForm.value.ciudaddsc = this.ciudaddsc;
    rutaForm.value.idcanal = this.canalid;
    rutaForm.value.canaldsc = this.canaldsc;
    rutaForm.value.idregion = this.regionid;
    rutaForm.value.regiondsc = this.regiondsc;
    rutaForm.value.sucursal = this.sucursal;
    rutaForm.value.calle = this.calle;
    rutaForm.value.colonia = this.colonia;
    rutaForm.value.cp = this.cp;
    rutaForm.value.proyectodsc = this.proyectodsc;
    rutaForm.value.idproyecto = this.idproyecto;

    if (rutaForm.value.idR == null){
      //guardar
      this.rutaservice.addRuta(rutaForm.value);
    }else {
      //modificar
      this.rutaservice.updateRuta(rutaForm.value);
    }
  }

  //select
  getListCanal(){
    this.canalservice.getAllCanales().subscribe( response  => {
      this.canalI = response;
    })
  };

  getListCadenas() {
    this.cadenaservice.getAllCadenas().subscribe( response  => {
      this.cadenaI = response;
    })
  };

  getListFormato() {
    this.formatoservice.getAllFormatos(this.selectedCadena).subscribe( response  => {
      this.formatoI = response;
    })
  };

  getListEstado(){
    this.estadoservice.getAllEstados().subscribe( response  => {
      this.estadoI = response;
    })
  };

  getListCiudad() {
    this.ciudadservice.getAllCiudades(this.selectedEstado).subscribe( response  => {
      this.ciudadI = response;
    })
  };

  getListRegion(){
    this.regionservice.getAllRegiones().subscribe( response  => {
      this.regionI = response;
    })
  };

  getListProyecto(){
    this.proyectoservice.getAllProyecto().subscribe(response => {
      this.proyectoI = response;
    })
  }

  getListTienda(){
    this.tiendaservice.getAllTienda().subscribe(response => {
      this.tiendaI = response;
    })
  }

}