import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { range } from '../helpers';

@Component({
  selector: 'app-ngx-data-tables',
  templateUrl: './ngx-data-tables.component.html',
  styleUrls: [],
})
export class NgxDataTablesComponent {
  ngxForm = this.fb.group({ rows: [], columns: [] });
  dataTablesColumns: Observable<TableColumn[]> = of([]);
  dataTablesRows: Observable<unknown[]> = of([]);
  first = 0;
  end = 0;
  constructor(private fb: FormBuilder) {
    this.dataTablesColumns = this.ngxForm.controls['columns'].valueChanges.pipe(
      tap(() => {
        this.resetTimers();
        this.first = Date.now();
      }),
      map((value) => range(1, value, 1)),
      map((numberArr) =>
        numberArr.map((value) =>
          value % 4
            ? { prop: 'name', name: value.toString() }
            : { prop: 'status', name: value.toString() }
        )
      ),
      tap(() => (this.end = Date.now()))
    );

    this.dataTablesRows = this.ngxForm.controls['rows'].valueChanges.pipe(
      map((value) => range(1, value, 1)),
      map((numberArr) =>
        numberArr.map((value) => ({ id: value, name: `row ${value}` }))
      )
    );
  }
  resetTimers() {
    this.first = 0;
    this.end = 0;
  }

  getCellClass({
    row,
    column,
  }: {
    row: { id: number; name: string };
    column: { prop: string };
  }) {
    let statusColor = {};
    if (column.prop === 'status') {
      const status = !!(row.id % 4);
      statusColor = {
        red: status,
        green: !status,
      };
    }
    return statusColor;
  }
}
