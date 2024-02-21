// filter.service.ts
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class FilterService {
	updateActiveFilters(params: any): any[] {
		let filters = params?.api?.filterManager?.allAdvancedFilters;
		let activeFilters = [];

		for (const [key, value] of filters) {
			if (value?.column?.filterActive) {
				let filterObject = {
					key: key,
					value: value?.column?.colDef?.headerName
				};
				activeFilters.push(filterObject);
			} else {
				activeFilters = activeFilters.filter((item) => item.value !== value?.column?.colDef?.headerName);
			}
		}

		return activeFilters;
	}

	clearFilter(api: any, filterKey: String): void {
		api.getFilterInstance(filterKey).setModel(null);
		api.onFilterChanged();
	}
}

export interface Filter {
	key: String;
	value: String;
}
