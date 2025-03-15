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

  constructor(private employeeService: EmployeeService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.employeeService
      .getListEmployee()
      .subscribe({
        next:
          (datos: Employee) => {
            if (datos) {
              console.log(datos);
              this.employees.push({ id: datos.id, name: datos.name, salary: datos.salary, age: datos.age, image: datos.image, employeeAnnualSalary: datos.employeeAnnualSalary });
              // this.changeDetectorRef.detectChanges(); // Fuerza la detección de cambios
            }
          },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });

    this.employees.push({ id: 1, name: 'Maria', salary: 120000, age: 25, image: '', employeeAnnualSalary: 240000 });
    this.employees.push({ id: 12, name: 'Jsoe', salary: 130000, age: 50, image: '', employeeAnnualSalary: 6475000 });
  }
}
