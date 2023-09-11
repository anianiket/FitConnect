import { Component } from '@angular/core';
import { Slot } from 'src/app/models/slot.model';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
})
export class SlotsComponent {
  slotList: Slot[] = [
    {
      slotId: '1',
      startTime: new Date('2023-09-12T06:00:00'),
      endTime: new Date('2023-09-12T08:00:00'),
      maximumLimit: 10,
      slotDate: '2023-09-12',
      trainerList: ['Trainer 1', 'Trainer 2'],
    },
    {
      slotId: '2',
      startTime: new Date('2023-09-12T08:30:00'),
      endTime: new Date('2023-09-12T10:30:00'),
      maximumLimit: 15,
      slotDate: '2023-09-01',
      trainerList: ['Trainer 3', 'Trainer 4'],
    },
    {
      slotId: '3',
      startTime: new Date('2023-09-12T11:00:00'),
      endTime: new Date('2023-09-12T13:00:00'),
      maximumLimit: 12,
      slotDate: '2023-09-12',
      trainerList: ['Trainer 5'],
    },
    {
      slotId: '4',
      startTime: new Date('2023-09-13T07:30:00'),
      endTime: new Date('2023-09-13T09:30:00'),
      maximumLimit: 10,
      slotDate: '2023-09-13',
      trainerList: ['Trainer 2', 'Trainer 3'],
    },
    {
      slotId: '5',
      startTime: new Date('2023-09-13T10:00:00'),
      endTime: new Date('2023-09-13T12:00:00'),
      maximumLimit: 15,
      slotDate: '2023-09-09',
      trainerList: ['Trainer 1', 'Trainer 4'],
    },
    {
      slotId: '6',
      startTime: new Date('2023-09-14T06:30:00'),
      endTime: new Date('2023-09-14T08:30:00'),
      maximumLimit: 12,
      slotDate: '2023-09-14',
      trainerList: ['Trainer 5', 'Trainer 2'],
    },
    {
      slotId: '7',
      startTime: new Date('2023-09-14T09:00:00'),
      endTime: new Date('2023-09-14T11:00:00'),
      maximumLimit: 10,
      slotDate: '2023-09-06',
      trainerList: ['Trainer 3'],
    },
    {
      slotId: '8',
      startTime: new Date('2023-09-15T07:00:00'),
      endTime: new Date('2023-09-15T09:00:00'),
      maximumLimit: 15,
      slotDate: '2023-09-07',
      trainerList: ['Trainer 4', 'Trainer 1'],
    },
    {
      slotId: '9',
      startTime: new Date('2023-09-15T09:30:00'),
      endTime: new Date('2023-09-15T11:30:00'),
      maximumLimit: 12,
      slotDate: '2023-09-15',
      trainerList: ['Trainer 5', 'Trainer 2'],
    },
    {
      slotId: '10',
      startTime: new Date('2023-09-16T08:00:00'),
      endTime: new Date('2023-09-16T10:00:00'),
      maximumLimit: 10,
      slotDate: '2023-09-09',
      trainerList: ['Trainer 3', 'Trainer 1'],
    },
  ];

 
  selectedSlot: Slot | null = null;
  formMode = false;
  updateMode = false;
  minDate: Date;
  maxDate: Date;
  newSlotDate!: string;
  newTimePeriod!: string;
  selectedTrainers: string[] = [];
  newMaxLimit!: number;
  trainersList: string[] = ['Trainer 1', 'Trainer 2', 'Trainer 3', 'Trainer 4', 'Trainer 5'];

  constructor() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 5);
  }

  selectSlot(slot: Slot) {
    this.selectedSlot = slot;
  }

  ngOnInit() {
    if (this.slotList.length > 0) {
      this.selectedSlot = this.slotList[0];
    }
  }

  updateSlotForm(slot: Slot) {
    this.formMode = true;
    this.updateMode = true;
    this.newSlotDate = slot.slotDate;
    this.selectedTrainers = slot.trainerList;
    this.newMaxLimit = slot.maximumLimit;
  }

  addSlotForm() {
    this.formMode = true;
    this.updateMode = false;
    this.newSlotDate = '';
    this.selectedTrainers = [];
    this.newMaxLimit = 0;
  }

  createSlot() {
    const newSlot: Slot = {
      slotId: 'your-generated-id', 
      startTime: new Date(this.newSlotDate + 'T' + this.newTimePeriod.split(' - ')[0]),
      endTime: new Date(this.newSlotDate + 'T' + this.newTimePeriod.split(' - ')[1]),
      maximumLimit: this.newMaxLimit,
      slotDate: this.newSlotDate,
      trainerList: this.selectedTrainers,
    };

    this.slotList.push(newSlot);

    this.formMode = false;
    this.newSlotDate = '';
    this.selectedTrainers = [];
    this.newMaxLimit = 0;
  }

  updateSlot() {
    if (this.selectedSlot) {
      this.selectedSlot.slotDate = this.newSlotDate;
      this.selectedSlot.trainerList = this.selectedTrainers;
      this.selectedSlot.maximumLimit = this.newMaxLimit;
    }

    this.formMode = false;
    this.updateMode = false;
  }

  deleteSlot(slotId: string) {

  }

  isSlotActive(slot: Slot): boolean {
    const currentDate = new Date();
    const slotDate = new Date(slot.slotDate);
    const startTime = new Date(slot.startTime);

    slotDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

    return currentDate < slotDate;
  }
}