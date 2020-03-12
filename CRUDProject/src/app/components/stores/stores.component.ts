import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
storeData: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'address', 'city', 'action'];

  constructor(private storesApi: ApiService) {
    this.storesApi.GetStores().subscribe(data => {
      this.storeData = data;
      this.dataSource = new MatTableDataSource<any>(this.storeData);

    })    
  }

  ngOnInit(): void {
  }

  deleteStore(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(index, 1);
      this.dataSource.data = data;
      this.storesApi.DeleteStore(e._id).subscribe()
    }
  }
}
