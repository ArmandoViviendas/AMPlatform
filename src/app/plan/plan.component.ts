import { Component, OnInit } from '@angular/core';
import { PlanService } from '../shared/services/plan/plan.service';
import { PlanInterface } from '../models/plan';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(private planservice: PlanService) { }
  private PlanI: PlanInterface[];

  ngOnInit() {
    this.getListPlan();
  }

  getListPlan(){
    this.planservice.getAllPlan().subscribe(response => {
      this.PlanI = response;
    })
  }

  onDeletePlan(idP: string){
    const confirmacion = confirm('estas seguro?');
    if(confirmacion){
      this.planservice.deletePlan(idP);
    }
  }

  onPreUpdatePlan(plan: PlanInterface){
    this.planservice.selectedPlan = Object.assign({}, plan);
  }
}
