import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {

  employee: any[] = [];

  constructor(private _employeeService: EmployeeService, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.getEmployee()
  }

  getEmployee() {
    this._employeeService.getEmployee().subscribe(data => {
      this.employee = [];
      data.forEach((item:any) => {
        this.employee.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      // console.log(this.employee);
    });
  }

  deleteEmployee(id: string) {
    this._employeeService.deleteEmployee(id).then(() => {
      this.toastr.error('El empleado ha sido eliminado.', 'Empleado Removido', {
        positionClass: 'toast-bottom-right'
      });
    }).catch((err) => console.log(err) )
  }

}
