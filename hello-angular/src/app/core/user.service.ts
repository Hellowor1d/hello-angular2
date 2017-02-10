import { Injectable } from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
//使用Rxjs替换Promise
import { User } from '../domain/entities';

@Injectable()
export class UserService {

  private api_url = 'http://localhost:3000/users';

  constructor(private http: Http) { }

  getUser(userId: number): Observable<User> {
    const url = `${this.api_url}/${userId}`;
    return this.http.get(url)
      .map(res => res.json() as User)
  }
  findUser(username: string): Observable<User> {
    const url = `${this.api_url}/?username=${username}`;
    return this.http.get(url)
      .map(res => {
        let users = res.json() as User[];
        return (users.length > 0) ? users[0] : null;
      });
  }
}
