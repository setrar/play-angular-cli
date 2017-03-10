import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Hit } from '../common/interfaces/hit.interface';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HitService {

   private hitsUrl = 'http://208.75.75.123:5000/redis'; 
   
   constructor (private http: Http) {}
   
   getHits() : Observable<Hit[]> {
      
      return this.http.get(this.hitsUrl)
         .map((res:Response) => res.json())
         .catch(
             (error:any) => 
             Observable.throw(error.json().error || 'Server error')
        );
     }
}