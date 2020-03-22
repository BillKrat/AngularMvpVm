import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDTONode } from '../files/DTONode';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

    constructor(private http: HttpClient) { }

    // ** Get files **
    getFiles(): Observable<IDTONode> {
       
      return this.http.get<IDTONode>(AppConstants.BaseUrl + 'api/Files/SystemFiles');

        // Call the client side code
        //return this._http.get(_Url)
        //    .map((response: Response) => <IDTONode>response.json())
        //    .catch(this.handleError);
    }

    // ** Get folders **
    getFolders(): Observable<IDTONode> {
        return this.http.get<IDTONode>(AppConstants.BaseUrl + 'api/Folders/SystemFolders');

        // Call the client side code
        //return this._http.get(_Url)
        //    .map((response: Response) => <IDTONode>response.json())
        //    .catch(this.handleError);
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
    deleteFilesAndFolders(paramNode: IDTONode): Observable<Object> {
      var _Url = 'api/Files';

      // This is a Post so we have to pass Headers
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let param = JSON.stringify(paramNode);
      let options = { headers: headers };

      // Call the client side code
      return this.http.post(_Url,param, options);
    }

    // Utility
    private handleError(error: Response) {
        // in a real world app, we may send the server to 
        // some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
