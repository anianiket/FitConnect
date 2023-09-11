import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gym } from '../models/gym.model';


@Injectable({
  providedIn: 'root',
})
export class GymService {
  private apiUrl = 'http://localhost:8008/api/v1/gym-service';

  constructor(private http: HttpClient) {}

  getGymInfo(): Observable<Gym> {
    return this.http.get<Gym>(`${this.apiUrl}/gym-info`);
  }

}
