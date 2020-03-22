import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../AppConstants'

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  constructor(private http: HttpClient) { }

  getFiles() {
    return this.http.get(AppConstants.BaseUrl + 'api/Files/JsonFile')
      .toPromise()
      .then(res => <TreeNode[]>res["data"]);
  }
}
