import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployee: FormGroup;
  submited = false;
  stateEmployeeForms: Boolean = false;
  loading = false;
  id: string | null;
  title: string = "Agregar Empleado";

  constructor(private fb: FormBuilder, 
              private _employeeService: EmployeeService, 
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createEmployee = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required]
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.isEdit();
  }

  mAOEEmployee() {
    this.stateEmployeeForms = this.createEmployee.invalid ? true : false;
    if (this.stateEmployeeForms) {
      return;
    }

    if (this.id == null) {
      this.addEmployee();
    } else {
      this.editEmployee(this.id);
    }
    
  }

  editEmployee(id: string) {
    let data : any = {
      name: this.createEmployee.value.name,
      surname: this.createEmployee.value.surname,
      position: this.createEmployee.value.position,
      salary: this.createEmployee.value.salary,
      dateUpdate: new Date()
    }
    this.loading = true;
    this._employeeService.updateEmployee(id, data).then(() => {
      this.loading = false;
      this.toastr.info('Se ha actualizado los datos correctamente.!', 'Empleado Editado.');
      this.router.navigate(['/list-employee']);
    }).catch((err) => { 
      console.log(err);
      this.loading = false;
    });
  }

  addEmployee() {
    let data : any = {
      name: this.createEmployee.value.name,
      surname: this.createEmployee.value.surname,
      position: this.createEmployee.value.position,
      salary: this.createEmployee.value.salary,
      dateCreate: new Date(),
      dateUpdate: new Date()
    }
    this.loading = true;
    this._employeeService.addEmployee(data).then(() => {
      this.toastr.success('Se ha registrado el empleado correctamente.!', 'Empleado Registrado');
      this.loading = false;
      this.router.navigate(['/list-employee']);
    }).catch(err => {
      console.log(err);
      this.loading = false;
    });
  }

  isEdit() {
    if (this.id != null) {
      this.loading = true;
      this._employeeService.getEmployeeID(this.id).subscribe((data) => {
        this.loading = false;
        this.title = "Editar Empleado";
        this.createEmployee.setValue({
          name: data.payload.data()['name'],
          surname: data.payload.data()['surname'],
          position: data.payload.data()['position'],
          salary: data.payload.data()['salary'],
        });
      });
    }
  }

}
