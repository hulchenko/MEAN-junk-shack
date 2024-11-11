import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PageEvent, PaginationAndProduct } from "../common/interfaces/pagination.interface";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrl: "./paginator.component.css",
})
export class PaginatorComponent {
  @Input() totalRecords: number;

  @Output() paginationInfo = new EventEmitter<PaginationAndProduct>();

  // default module values
  first: number = 0;
  rows: number = 34;

  onPageChange(event: PageEvent) {
    this.first = event.first; // offset
    this.rows = event.rows; // page size

    this.paginationInfo.emit({ currPage: event.page, offset: event.first });
  }
}
