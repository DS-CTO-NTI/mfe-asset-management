import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
/**
 * Ag-Grid Pagination Panel Component
 * This component provides a pagination facility for the ag-grid data table.
 *
 * @Input totalPageSize:  A number indicating the total number of pages.
 * @Input rowNumbersList:  A list of page row numbers to display in the select menu.
 * @Input defaultPageSize:  A number indicating the default page size.
 *
 * Example usage:
 *
 *
 **/
@Component({
	selector: "app-ag-grid-pagination-section",
	template: `
		<section class="ag-pagination">
			<form class="form-inline">
				<div class="form-group">
					<label>Rows per page:</label>
					<select class="form-control form-control-sm mx-sm-3" placeholder="10" (change)="onPageSizeChange($event)" required>
						<option class="form-control border-0" *ngFor="let row of rowsPerPageList" [value]="row">{{ row }}</option>
					</select>
				</div>
			</form>
			<div class="ag-pagination-panel">
				<button class="btn" [disabled]="isFirst" (click)="goToFirstPage()"><i class="fa fa-step-backward"></i></button>
				<button class="btn" [disabled]="isPrev" (click)="goToPreviousPage()"><i class="fa fa-1x fa-caret-left"></i></button>
				<div>Page {{ currentPageNumber + 1 }} of {{ totalPageSize }}</div>
				<button class="btn" [disabled]="isNext" (click)="goToNextPage()"><i class="fa fa-1x fa-caret-right"></i></button>
				<button class="btn" [disabled]="isLast" (click)="goToLastPage()"><i class="fa fa-step-forward"></i></button>
			</div>
		</section>
	`,
	styles: [
		`
			.ag-pagination {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				padding: 0px 10px;
				font-size: 14px;
				&-panel {
					display: flex;
					align-items: center;
				}
			}
			.btn {
				padding: 0.3rem 0.5rem;
				&:disabled {
					color: #ccc; /* Gray color for the disabled state */
					cursor: not-allowed;
				}
				&:focus {
					box-shadow: none;
				}
			}
			.form-control {
				border-radius: 0;
				&:focus {
					box-shadow: none;
				}
			}
		`
	]
})
export class AgGridPaginationSectionComponent {
	@Input() colorTheme?: "light" | "dark" = "dark";
	@Input() currentPageNumber: number = 0;
	@Input() currentPageSize: number = 0;
	@Input() totalPageSize: number = 0;
	@Input() rowsPerPageList: [];
	@Input() defaultPageSize?: number = 10;
	@Output() changePageSize = new EventEmitter<Pagination>();

	public isFirst: boolean = true;
	public isLast: boolean = true;
	public isNext: boolean = true;
	public isPrev: boolean = true;

	onPageSizeChange(event: Event) {
		const pageSize = (event.target as HTMLSelectElement).value;
		this.currentPageSize = Number(pageSize);
		this.currentPageNumber = 0;
		const paginationData: Pagination = {
			pageSize: this.currentPageSize,
			pageNumber: this.currentPageNumber
		};
		this.changePageSize.emit(paginationData);
	}

	ngOnChanges(_changes: SimpleChanges) {
		this.setPaginationControls();
	}

	setPaginationControls() {
		const hasMultiplePages = this.totalPageSize > 1;
		const isFirstPage = this.currentPageNumber === 0;
		const isLastPage = this.currentPageNumber === this.totalPageSize - 1;

		this.isFirst = !hasMultiplePages || isFirstPage;
		this.isPrev = !hasMultiplePages || isFirstPage;
		this.isLast = !hasMultiplePages || isLastPage;
		this.isNext = !hasMultiplePages || isLastPage;
	}

	navigateToPage(pageNumber: any): void {
		this.currentPageNumber = pageNumber;
		const paginationData: Pagination = {
			pageSize: this.currentPageSize,
			pageNumber: this.currentPageNumber
		};

		this.changePageSize.emit(paginationData);
	}

	goToFirstPage = () => this.navigateToPage(0);

	goToLastPage = () => this.navigateToPage(this.totalPageSize - 1);

	goToNextPage = () => this.navigateToPage(this.currentPageNumber + 1);

	goToPreviousPage = () => this.navigateToPage(this.currentPageNumber - 1);
}

export interface Pagination {
	pageSize: number;
	pageNumber: number;
}
