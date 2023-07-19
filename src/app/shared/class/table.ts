
import {MatTableDataSource} from "@angular/material/table";

export class Table<T> {
  public columns: string[];
  public dataSource: MatTableDataSource<T>
  constructor(
    columns: string[],
  ) {
    this.columns = columns;
    this.dataSource = new MatTableDataSource<T>([]);
  }

  public changes$() {
    this.dataSource.connect().subscribe({
      next: (data) => {
      }
    })
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
