import { baseURL } from './constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  tokenName = 'token';

  constructor(private http: HttpClient) { }

  // Login
  httpLogin(url, params = {}): any {
    return this.http.post(baseURL + url, params, {});
  }

  // Register
  httpRegister(url, params = {}): any {
    return this.http.post(baseURL + url, params, {});
  }

  // get
  httpGet(url, params = {}): any {
    let par = '?';
    Object.keys(params).forEach((key, index) => {
      par += key + '=' + params[key] + '&';
    });
    const headers = {
      token: localStorage.getItem(this.tokenName)
    };
    return this.http.get(baseURL + url + par, { headers });
  }
  // post
  httpPost(url, params = {}): any {
    const headers = {
      token: localStorage.getItem(this.tokenName)
    };
    return this.http.post(baseURL + url, params, { headers });
  }
  // put
  httpPut(url, params): any {
    const headers = {
      token: localStorage.getItem(this.tokenName)
    };
    return this.http.put(baseURL + url, params, { headers });
  }
  // delete
  httpDelete(url): any {
    const headers = {
      token: localStorage.getItem(this.tokenName)
    };

    return this.http.delete(baseURL + url, { headers });
  }
}
