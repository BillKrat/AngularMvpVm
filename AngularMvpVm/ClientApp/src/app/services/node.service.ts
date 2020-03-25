import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../AppConstants'
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  constructor(private http: HttpClient) { }

  getFiles() {
    var url = AppConstants.BaseUrl + 'api/Files/JsonFile';
    return this.http.get<TreeNode[]>(url)
      .pipe(
        map(res => res["data"]),
        shareReplay()
      );
  }
}
