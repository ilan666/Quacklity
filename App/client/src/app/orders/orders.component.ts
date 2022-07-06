import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[]
  order: Order
  displayedColumns = ['id', 'orderDate', 'address', 'payedWith', 'items'];
  dataSource: MatTableDataSource<Order>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService,
              private route: Router) { }

  ngOnInit() {
    this.getUserOrders()
  }

  getUserOrders(){
    this.orderService.getUserOrders().subscribe((data) => {
      this.orders = data
      this.dataSource = new MatTableDataSource(data)
      this.setPagination()
    })
  }

  setPagination()
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDetails(row: MatRow){
    this.order = row as Order
    this.route.navigate(['/order-details/' + this.order.id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
