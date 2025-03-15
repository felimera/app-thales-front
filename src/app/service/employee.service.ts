import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://127.0.0.1:8080/app-thales-back-0.0.1-SNAPSHOT/api/v1/employee';

  constructor(private http: HttpClient) { }

  getListEmployee(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}`);
  }

  getByIdEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
}
