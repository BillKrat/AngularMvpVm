import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api/treenode';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  // ** Get files **
  getFiles(): Observable<TreeNode> {
    return this.http.get<TreeNode>(AppConstants.BaseUrl + 'api/Files/SystemFiles');
  }

  // ** Get folders **
  getFolders(): Observable<TreeNode> {
    return this.http.get<TreeNode>(AppConstants.BaseUrl + 'api/Folders/SystemFolders');
  }

  // ** Create folder **
  createFolder(paramFolder: string): Observable<Object> {
    var _Url = 'api/Folders';

    // This is a Post so we have to pass Headers
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let param = JSON.stringify(paramFolder);
    let options = { headers: headers };

    // Call the client side code
    return this.http.post(_Url, param, options);
  }

  // ** Delete files and folders **
  deleteFilesAndFolders(paramNode: TreeNode): Observable<Object> {
    var _Url = 'api/Files';

    // This is a Post so we have to pass Headers
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let param = JSON.stringify(paramNode);
    let options = { headers: headers };

    // Call the client side code
    return this.http.post(_Url, param, options);
  }
}
