import { Component } from '@angular/core';
import { Plan } from 'src/app/models/plan.model';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent {
  planList: Plan[] = [
    {
      planId: '1',
      planName: 'Basic Plan',
      planPrice: 999,
      planDuration: '1 month',
    },
    {
      planId: '2',
      planName: 'Standard Plan',
      planPrice: 2799,
      planDuration: '3 months',
    },
    {
      planId: '3',
      planName: 'Premium Plan',
      planPrice: 5299,
      planDuration: '6 months',
    },
    {
      planId: '4',
      planName: 'Gold Plan',
      planPrice: 7999,
      planDuration: '1 year',
    }
  ];

  selectedPlan: Plan | null = null;
  formMode = false;
  updateMode = false;
  newPlanName = '';
  newPrice = 0;
  newDuration = '';
  durationList: string[] = ['1', '2', '3', '6', '12', '18', '24'];

  selectPlan(plan: Plan) {
    this.selectedPlan = plan;
  }

  ngOnInit() {
    if (this.planList.length > 0) {
      this.selectedPlan = this.planList[0];
    }
  }

  updatePlanForm(plan: Plan) {
    this.formMode = true;
    this.updateMode = true;
    this.newPlanName = plan.planName;
    this.newPrice = plan.planPrice;
    this.newDuration = plan.planDuration;
  }

  addPlanForm() {
    this.formMode = true;
    this.updateMode = false;
    this.newPlanName = '';
    this.newPrice = 0;
    this.newDuration = '';
  }

  createPlan() {
    const newPlan: Plan = {
      planId: (this.planList.length + 1).toString(),
      planName: this.newPlanName,
      planPrice: this.newPrice,
      planDuration: this.newDuration,
    };

    this.planList.push(newPlan);

    this.newPlanName = '';
    this.newPrice = 0;
    this.newDuration = '';

    this.formMode = false;
  }

  updatePlan() {
    if (this.selectedPlan) {
      const index = this.planList.findIndex(plan => plan.planId === this.selectedPlan?.planId);

      if (index !== -1) {
        this.planList[index].planName = this.newPlanName;
        this.planList[index].planPrice = this.newPrice;
        this.planList[index].planDuration = this.newDuration;

        this.newPlanName = '';
        this.newPrice = 0;
        this.newDuration = '';

        this.formMode = false;
        this.updateMode = false;
      }
    }
  }

  deletePlan(planId: string) {

  }
}
