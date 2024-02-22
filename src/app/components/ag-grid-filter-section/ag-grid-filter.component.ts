import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-ag-grid-filter",
	template: `
		<section id="filter" class="filter">
			<div class="filter__label">
				Filters :
				<ng-container *ngIf="activeFilters?.length > 0; else noActiveFilters">
					<span *ngFor="let filter of activeFilters">
						<span class="badge badge-pill badge-success ml-1" (click)="onClearFilter(filter)">{{ filter.value }} &times;</span>
					</span>
				</ng-container>
			</div>
		</section>

		<ng-template #noActiveFilters>
			<span class="filter__text">{{ "noFilterSelected" | translate }}</span>
		</ng-template>
	`,
	styles: [
		`
			.filter {
				&__label {
					color: rgb(196, 31, 31);
					font-weight: 500;
					margin: 0;
				}
				&__text {
					color: #ccc;
					margin-left: 5px;
					font-size: 15px;
					font-weight: 100;
				}
			}
			.badge {
				cursor: pointer;
				font-weight: 400;
			}
		`
	]
})
export class AgGridFilterComponent {
	@Input() activeFilters: any[];
	@Output() clearFilter = new EventEmitter<any>();

	onClearFilter(filter: any): void {
		this.clearFilter.emit(filter);
	}
}
