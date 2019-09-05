import { Component, OnInit } from '@angular/core';
import { CanalService } from '../shared/services/canal/canal.service';
import { CanalInterface } from '../models/canal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.css']
})
export class CanalComponent implements OnInit {

  constructor(private canalservice: CanalService) {}
  private canalI: CanalInterface[];

  ngOnInit() {
    this.getListCanal();
  }

  getListCanal(){
    this.canalservice.getAllCanales().subscribe( response  => {
      this.canalI = response;
    })
  };

  onDeleteCanal(idcanal: string) {
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.canalservice.deleteCanal(idcanal);
    }
  }

  onPreUpdateCanal(canal: CanalInterface){
    this.canalservice.selectedCanal = Object.assign({}, canal);
  }
}