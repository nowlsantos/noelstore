import { Component, OnInit, Input } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: FirebaseListObservable<any[]>;
  
  @Input('category') category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

}
