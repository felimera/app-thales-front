import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-table-employee',
  templateUrl: './table-employee.component.html',
  styleUrl: './table-employee.component.scss'
})
export class TableEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee = {
    id: 0,
    name: '',
    salary: 0,
    age: 0,
    image: '',
    employeeAnnualSalary: 0
  };

  constructor(
    private employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getEmployeesList();
  }

  public getEmployeesList(): void {
    this.employeeService
      .getListEmployee()
      .subscribe({
        next:
          (datos: Employee) => {
            if (datos) {
              console.log(datos);
              this.employees.push({ id: datos.id, name: datos.name, salary: datos.salary, age: datos.age, image: datos.image, employeeAnnualSalary: datos.employeeAnnualSalary });
              this.changeDetectorRef.detectChanges(); // Fuerza la detección de cambios
            }
          },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
    this.employees.push({ id: 1, name: 'Tiger Nixon', salary: 320800, age: 61, image: '', employeeAnnualSalary: 3849600 });
    this.employees.push({ id: 2, name: 'Garrett Winters', salary: 170750, age: 63, image: '', employeeAnnualSalary: 2049000 });
  }

  public getEmployee(id: number): void {
    this.employeeService
      .getByIdEmployee(id)
      .subscribe({
        next:
          (datos: Employee) => {
            if (datos) {
              console.log(datos);
              this.employee = datos;
              // this.changeDetectorRef.detectChanges(); // Fuerza la detección de cambios
            }
          },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
  }

  public openModal(id: number): void {
    const modeDiv = document.getElementById('myModal');
    if (modeDiv != null) {
      modeDiv.style.display = 'block';
    }
    this.getEmployee(id);
  }

  public closeModal(): void {
    const modeDiv = document.getElementById('myModal');
    if (modeDiv != null) {
      modeDiv.style.display = 'none';
    }
  }
}
