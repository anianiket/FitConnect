import { Component } from '@angular/core';
import { MediaFile } from 'src/app/models/mediafile.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  mediaFiles: MediaFile[] = [
    {
      mediaId: '1',
      mediaName: 'Image 1',
      mediaCategory: 'Image',
      mediaUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    },
    {
      mediaId: '2',
      mediaName: 'Image 2',
      mediaCategory: 'Image',
      mediaUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
  ];

  selectedMediaFile: MediaFile | null = null;
  formMode = false;
  updateMode = false;
  newMediaName!: string;
  newMediaCategory!: string;

  selectedImageFile: File | null = null;

  showDetails(mediaFile: MediaFile) {
    this.selectedMediaFile = mediaFile;
  }

  hideDetails() {
    this.selectedMediaFile = null;
  }

  updateMediaFileForm(mediaFile: MediaFile) {
    this.formMode = true;
    this.updateMode = true;
    this.newMediaName = mediaFile.mediaName;
    this.newMediaCategory = mediaFile.mediaCategory;
    this.selectedImageFile = null;
  }

  addMediaFileForm() {
    this.formMode = true;
    this.updateMode = false;
    this.newMediaName = '';
    this.newMediaCategory = '';
    this.selectedImageFile = null;
  }

  createMediaFile() {
    if (this.selectedImageFile) {
      console.log('Selected Image File:', this.selectedImageFile);
    }

    this.formMode = false;
  }

  updateMediaFile() {
    if (this.selectedImageFile) {
      console.log('Selected Image File:', this.selectedImageFile);
    }

    this.formMode = false;
    this.updateMode = false;
  }

  deleteMediaFile(mediaId: string) {
    
  }

  onImageSelect(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
    }
  }
}
