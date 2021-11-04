import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Los servicios son utilizados para comunicarse con el Backend, reutilizar codigo o comunicarse entre componentes
 */
export class EmployeeService {

  constructor(private firestore: AngularFirestore) { }

  addEmployee(employee: any): Promise<any> {
    return this.firestore.collection('employee').add(employee);
  }

  getEmployee(): Observable<any> {
    return this.firestore.collection('employee', ref => ref.orderBy('dateUpdate', 'asc')).snapshotChanges();
  }

  deleteEmployee(id: string): Promise<any> {
    return this.firestore.collection('employee').doc(id).delete();
  }

  getEmployeeID(id: string): Observable<any> {
    return this.firestore.collection('employee').doc(id).snapshotChanges();
  }

  updateEmployee(id:string, employee: any): Promise<any> {
    return this.firestore.collection('employee').doc(id).update(employee);
  }
}

