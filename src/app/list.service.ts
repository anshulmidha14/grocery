import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public base_url: any = 'http://edemo.online/testapi/';
  constructor(private _http: HttpClient) { }

  get httpHeaders() {
    return {
      headers: new HttpHeaders({
        // 'Access-Control-Allow-Headers': '*',
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      })
    };
  }

  getList() {
    return this._http.get(this.base_url+'fetch.php');
  }

  updateList(req) {
    return this._http.get(this.base_url+'update.php?id='+`${req.id}`+'&name='+`${req.name}`)
  }

  deleteList(req) {
    return this._http.get(this.base_url+'delete.php?id='+`${req.id}`)
  }

  addList(req) {
    return this._http.get(this.base_url+'insert.php?name='+`${req.name}`)
  }
}
