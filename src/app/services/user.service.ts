import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }
  getUserByID(id): Observable<User>{
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }
  addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/${user.id}`, user);
  }
}
