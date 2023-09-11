import { Component } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent {
  trainerList: Trainer[] = [{
    trainerId: '1',
    trainerName: 'Trainer 1',
    trainerCategory: 'Fitness',
    trainerBio: 'Certified fitness trainer with 10+ years of experience.',
    trainerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-fGVYY3FqbIp77vSi-2koJZBCLkzGBI3Qw&usqp=CAU',
  },
  {
    trainerId: '2',
    trainerName: 'Trainer 2',
    trainerCategory: 'Yoga',
    trainerBio: 'Experienced yoga instructor specializing in Hatha yoga.',
    trainerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrlH_qhF_Pq4ZhcyteIgPizqJcvZIvPliAaw&usqp=CAU',
  },
  ];

  selectedTrainer: Trainer | null = null;
  formMode = false;
  updateMode = false;
  newTrainerName!: string;
  newTrainerCategory!: string;
  newTrainerBio!: string;

  selectedImageFile: File | null = null;

  selectTrainer(trainer: Trainer) {
    this.selectedTrainer = trainer;
  }

  ngOnInit() {
    if (this.trainerList.length > 0) {
      this.selectedTrainer = this.trainerList[0];
    }
  }

  updateTrainerForm(trainer: Trainer) {
    this.formMode = true;
    this.updateMode = true;
    this.newTrainerName = trainer.trainerName;
    this.newTrainerCategory = trainer.trainerCategory;
    this.newTrainerBio = trainer.trainerBio;
    this.selectedImageFile = null;
  }

  addTrainerForm() {
    this.formMode = true;
    this.newTrainerName = '';
    this.newTrainerCategory = '';
    this.newTrainerBio = '';
    this.selectedImageFile = null;
  }

  createTrainer() {
    if (this.selectedImageFile) {
      console.log('Selected Image File:', this.selectedImageFile);
    }

    this.formMode = false;
  }

  updateTrainer() {
    
  }

  deleteTrainer(trainerId: string) {

  }

  onImageSelect(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
    }
  }
}

