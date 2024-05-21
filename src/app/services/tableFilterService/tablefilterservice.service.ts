import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TablefilterserviceService {
	constructor(private http: HttpClient) { }

	filter(tableref, colDefs) {
		let filters = tableref.api.getFilterModel();
		let filterKeys = Object.keys(filters);
		let userTableFilter = [];
		if (filterKeys.length > 0) {
			filterKeys.forEach(filter => {
				userTableFilter.push(colDefs.find((column) => {
					return column.field == filter;
				}).headerName);
			})
		}
		else {
			userTableFilter = null;
		}
		return userTableFilter;
	}

	clearFilter(tableref, colDefs, filter) {
		let filterField = colDefs.find((column) => {
			return column.headerName == filter;
		}).field;
		tableref.api.getFilterInstance(filterField).setModel(null);
		tableref.api.onFilterChanged();
		return this.filter(tableref, colDefs);
	}


	public saveState(statedata): Observable<any> {
		return this.http.post(environment.apiUrl + UrlMappings.saveState, statedata);
	}

	public getState(statedata): Observable<any> {
		return this.http.post(environment.apiUrl + UrlMappings.getState, statedata);
	}

	public
		(statedata): Observable<any> {
		return this.http.post(environment.apiUrl + UrlMappings.deleteState, statedata);
	}

	public updateState(statedata): Observable<any> {
		return this.http.put(environment.apiUrl + UrlMappings.updateState, statedata);
	}

  public deleteState(statedata): Observable<any> {
		return this.http.post(environment.apiUrl + UrlMappings.deleteState,statedata);
	  }
}