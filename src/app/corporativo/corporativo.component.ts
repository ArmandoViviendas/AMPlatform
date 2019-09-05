import { Component, OnInit } from '@angular/core';
import { CorporativoService } from '../shared/services/corporativos/corporativo.service';
import { CInterface } from '../models/corporativo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-corporativo', 
  templateUrl: './corporativo.component.html',
  styleUrls: ['./corporativo.component.css']
})
export class CorporativoComponent implements OnInit {

  constructor(private corporativoS: CorporativoService) {}
  private corporativo: CInterface[];
  

  ngOnInit() {
    this.getListCorporativos();
  }

  getListCorporativos() {
    this.corporativoS.getAllCorporativos().subscribe( response  => {
      this.corporativo = response;
    })
  };

  onDeleteCorporativo(idCorporativo: string) {
    console.log(idCorporativo);
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.corporativoS.deleteCorporativo(idCorporativo);
    }
  }

  onPreUpdateCorporativo(corporativo: CInterface){
    this.corporativoS.selectedCorporativo = Object.assign({}, corporativo);
  }
}
