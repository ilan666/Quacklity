import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../models/pagination';
import { Whiskey } from '../models/whiskey';

@Injectable({
  providedIn: 'root'
})
export class BottlesService {

baseAPI = environment.baseUrl
paginationResult: PaginationResult<Whiskey[]> = new PaginationResult<Whiskey[]>()

constructor(private http: HttpClient) { }

getWhiskeyListData(page?: number, itemsPerPage?: number): Observable<PaginationResult<Whiskey[]>>{

  let params = new HttpParams();

  if(page != null && itemsPerPage != null){
    params = params.append('pageNumber', page.toString())
    params = params.append('pageSize', itemsPerPage.toString())
  }

  return this.http.get<Whiskey[]>(this.baseAPI + 'whiskey', {
    observe: 'response',
    params
  })
  .pipe(
    map((response: HttpResponse<Whiskey[]>) => {
      this.paginationResult.result = response.body as Whiskey[];
      if(response.headers.get('Pagination') !== null){
        this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination') || '')
      }
      return this.paginationResult
    })
  )
}

getWhiskeyData(id: number): Observable<Whiskey>{
  return this.http.get<Whiskey>(this.baseAPI + 'whiskey/' + id)
}

getSortedWhiskeyData(types: String[], page?: number, pageSize?: number): Observable<PaginationResult<Whiskey[]>> {
  let params = new HttpParams()

  if(page != null && pageSize != null) {
    params = params.append('pageNumber', page.toString())
    params = params.append('pageSize', pageSize.toString())
  }

  return this.http.post<Whiskey[]>(this.baseAPI + 'whiskey/types', types , {
    observe: 'response',
    params
  })
  .pipe(
    map((response: HttpResponse<Whiskey[]>) => {
      this.paginationResult.result = response.body as Whiskey[]
      if(response.headers.get('Pagination') !== null){
        this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination') || '')
      }
      return this.paginationResult
    })
  )
}

getTopRated(): Observable<Whiskey[]>{
  return this.http.get<Whiskey[]>(this.baseAPI + 'whiskey/top')
}

getUserRatedBottles(page?: number, itemsPerPage?: number): Observable<PaginationResult<Whiskey[]>>{

  let params = new HttpParams()

  if(page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page.toString())
    params = params.append('pageSize', itemsPerPage.toString())
  }

  return this.http.get<Whiskey[]>(this.baseAPI + 'whiskey/user-rates', {
    observe: 'response',
    params
  })
  .pipe(
    map((response: HttpResponse<Whiskey[]>) => {
      this.paginationResult.result = response.body as Whiskey[]
      if(response.headers.get('Pagination') !== null){
        this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination') || '')
      }
      return this.paginationResult
    })
  )
}

}
