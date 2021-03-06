import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { TIME_TO_WAIT } from 'src/app/config/config';
import { ErrorManager } from 'src/app/errors/error-manager';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styles: [
  ]
})
export class EmployeeSearchComponent implements OnInit {

  employees: Employee[] = [];
  loading: boolean = false;

  constructor(private _employeeService: EmployeeService, private eventManager: EventManager) {

  }


  ngOnInit(): void {
    this.getEmployees();
  }

  //obtener toda la lista de empleados al inicio de la página
  async getEmployees() {
    this.loading = true;
    await new Promise(f => setTimeout(f, TIME_TO_WAIT));
    this._employeeService.getJSON()
      .subscribe((res: any) => {
        this.employees = res;
        this.sortEmployees();
        this.loading = false;
      }, error => {
        this.loading = false;
        ErrorManager.handleError(error);
      });
  }

  //ordenando a los empleados
  sortEmployees() {
    let sortedEmployees = this.employees.sort((a, b) => (a.firstName! < b.firstName!) ? -1 : 1);
    this.employees = sortedEmployees;
  }

  //obteniendo la data sel servicio y posteriormente filtrando
  searchEmployees(searchText: string) {
    this.loading = true;
    this._employeeService.getJSON()
      .subscribe((res: Employee[]) => {
        this.filterEmployeesInList(res, searchText);
        this.loading = false;
      }, error => {
        this.loading = false;
        ErrorManager.handleError(error);
      });
  }

  //filtrando el termino de búsqueda en cada campo del arreglo de empleados
  filterEmployeesInList(res: Employee[], searchText: string) {

    let searchedEmployees: Employee[] = [];
    res.forEach(employee => {

      if (employee.name?.toUpperCase().includes(searchText.toUpperCase())
        || employee.firstName?.toUpperCase().includes(searchText.toUpperCase())
        || employee.lastName?.toUpperCase().includes(searchText.toUpperCase())
        || employee.job?.toUpperCase().includes(searchText.toUpperCase())
        || employee.phone?.toUpperCase().includes(searchText.toUpperCase())
        || employee.email?.toUpperCase().includes(searchText.toUpperCase()))
        searchedEmployees.push(employee);

    });

    this.employees = [];
    this.employees = searchedEmployees;
  }


}
