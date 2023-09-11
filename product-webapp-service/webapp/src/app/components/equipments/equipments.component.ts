import { Component } from '@angular/core';
import { Equipment } from 'src/app/models/equipment.model';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent {
  equipmentList: Equipment[] = [
    {
      equipmentId: '1',
      equipmentName: 'Treadmill',
      equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrz93yREjk92BUijB8x7pMdFzD3qEEhrL1g&usqp=CAU',
      equipmentDescription: 'A fitness treadmill',
      quantity: 5,
    },
    {
      equipmentId: '2',
      equipmentName: 'Exercise Bike',
      equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvnjw-3I1vNy5P5Vc9aOdUOTEq5S9yDERbaA&usqp=CAU',
      equipmentDescription: 'An exercise bike for cardio workouts',
      quantity: 3,
    },
    {
      equipmentId: '3',
      equipmentName: 'Dumbbells',
      equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0_dEI33j2IO6DlKIQ5q9pT_SX9Uzzp945hA&usqp=CAU', 
      equipmentDescription: 'A set of dumbbells for strength training',
      quantity: 10,
    },
    {
      equipmentId: '4',
      equipmentName: 'Elliptical Trainer',
      equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwtbmxevQ6hXFe6eaaPaGXiRu4Mawj3e4pA&usqp=CAU', 
      equipmentDescription: 'An elliptical trainer for low-impact workouts',
      quantity: 2,
    },
    {
      equipmentId: '5',
      equipmentName: 'Rowing Machine',
      equipmentImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvI1XKbLUCbA7gC-X_adiZnrFk6U4qiCFtg&usqp=CAU', 
      equipmentDescription: 'A rowing machine for full-body workouts',
      quantity: 4,
    },
  ];

  selectedEquipment: Equipment | null = null;
  formMode = false;
  updateMode = false;
  newEquipmentName = '';
  newEquipmentDescription = '';
  newQuantity = 0;
  selectedImageFile: File | null = null;

  selectEquipment(equipment: Equipment) {
    this.selectedEquipment = equipment;
  }

  ngOnInit() {
    if (this.equipmentList.length > 0) {
      this.selectedEquipment = this.equipmentList[0];
    }
  }

  updateEquipmentForm(equipment: Equipment) {
    this.formMode = true;
    this.updateMode = true;
    this.selectedEquipment = equipment;
    this.newEquipmentName = equipment.equipmentName;
    this.newEquipmentDescription = equipment.equipmentDescription;
    this.newQuantity = equipment.quantity;
  }

  addEquipmentForm() {
    this.formMode = true;
    this.updateMode = false;
    this.selectedEquipment = null;
    this.newEquipmentName = '';
    this.newEquipmentDescription = '';
    this.newQuantity = 0;
    this.selectedImageFile = null;
  }

  createEquipment() {
    if (this.selectedImageFile) {
      const newEquipment: Equipment = {
        equipmentId: (this.equipmentList.length + 1).toString(),
        equipmentName: this.newEquipmentName,
        equipmentDescription: this.newEquipmentDescription,
        quantity: this.newQuantity,
        equipmentImage: 'your_image_url_or_path.jpg',
      };

      this.equipmentList.push(newEquipment);

      this.newEquipmentName = '';
      this.newEquipmentDescription = '';
      this.newQuantity = 0;
      this.selectedImageFile = null;

      this.formMode = false;
    }
  }

  updateEquipment() {
    if (this.selectedEquipment) {
      const index = this.equipmentList.findIndex(equipment => equipment.equipmentId === this.selectedEquipment?.equipmentId);

      if (index !== -1) {
        this.equipmentList[index].equipmentName = this.newEquipmentName;
        this.equipmentList[index].equipmentDescription = this.newEquipmentDescription;
        this.equipmentList[index].quantity = this.newQuantity;

        this.newEquipmentName = '';
        this.newEquipmentDescription = '';
        this.newQuantity = 0;
        this.selectedImageFile = null;

        this.formMode = false;
        this.updateMode = false;

      }
    }
  }

  deleteEquipment(equipmentId: string) {
    
  }

  isEquipmentAvailable(equipment: Equipment): boolean {
    return equipment.quantity > 0;
  }

  onImageSelect(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
    }
  }
}
