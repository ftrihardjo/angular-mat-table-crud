import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Issue[]>("http://localhost:8080/all").subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  /**   DEMO ONLY, you can find working methods below
  addIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }
}*/




    // ADD, POST METHOD
    addIssue(kanbanItem: Issue): void {
    this.httpClient.post("http://localhost:8080/add", kanbanItem);
   }

    // UPDATE, PUT METHOD
     updateIssue(kanbanItem: Issue): void {
    this.httpClient.put("http://localhost:8080/update/" + kanbanItem.id, kanbanItem);
  }

  // DELETE METHOD
  deleteIssue(id: number): void {
    this.httpClient.delete("http://localhost:8080/delete/" + id);
  }
}




