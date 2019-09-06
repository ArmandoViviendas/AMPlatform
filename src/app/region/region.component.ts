import { Component, OnInit } from '@angular/core';
import { RegionService } from  '../shared/services/regiones/region.service';
import { RegionInterface } from '../models/region';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  constructor(private regionservice: RegionService) {}
  private regionI: RegionInterface[];

  ngOnInit() {
    this.getListRegion();
  }

  getListRegion(){
    this.regionservice.getAllRegiones().subscribe( response  => {
      this.regionI = response;
    })
  };

  onDeleteRegion(idregion: string) {
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.regionservice.deleteRegion(idregion);
    }
  }

  onPreUpdateRegion(region: RegionInterface){
    this.regionservice.selectedRegion = Object.assign({}, region);
  }

}
