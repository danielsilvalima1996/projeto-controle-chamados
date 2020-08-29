import { Component, OnInit, Input, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { PoButtonGroupItem, PoNotificationService } from '@po-ui/ng-components';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
 selector: 'app-pagination',
 templateUrl: './pagination.component.html',
 styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

 /** Buttons */
 readonly previousButton: PoButtonGroupItem = {
  icon: 'po-icon po-icon-arrow-left',label:'Anterior',
  action: () => { this.changePage(this.currentPage - 1); }
};

readonly nextButton: PoButtonGroupItem = {
  icon: 'po-icon po-icon-arrow-right',label:'Próxima',
  action: () => { this.changePage(this.currentPage + 1); }
};

readonly firstButton: PoButtonGroupItem = {
  icon: 'po-icon po-icon-first-page',label:'Primeira',
  action: () => { this.changePage(this.currentPage = 1); }
};

readonly lastButton: PoButtonGroupItem = {
  icon: 'po-icon po-icon-last-page',label:'Última',
  action: () => { this.changePage(this.currentPage = this.totalPages); }
};

readonly buttons: PoButtonGroupItem[] = [
  this.firstButton, this.previousButton
];

readonly newButtons: PoButtonGroupItem[] = [
  this.nextButton, this.lastButton
];

/** Props */

/** Total number of items */
private countTotalItems = 1;

// get total number of items
get totalItems(): number {
  return this.countTotalItems;
}

// set total number of items
@Input()
set totalItems(items: number) {
  this.countTotalItems = items;
  this.totalPages = this.calculatePages();
}

/** Items per page */
private countItemsPerPage: number;

get itemsPerPage(): number {
  return this.countItemsPerPage;
}

@Input()
set itemsPerPage(item) {
  this.countItemsPerPage = item;
  this.totalPages = this.calculatePages();
}

/** Current page */
@Input() currentPage: number = 1;

/** Total number of pages */
totalPages: number;

/** Event emitted on page change */
@Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

/**
 *
 * disabled button changes pages
 *
 */
@Input()
set disabled(value: boolean) {
  this.nextButton.disabled = value;
  this.previousButton.disabled = value;
  
  this.firstButton.disabled = value;
  this.lastButton.disabled = value;
  
  

  // verifica as páginas
  if ((this.totalPages && this.currentPage === 1) || value === false) {
    this.isFirstPage(this.currentPage);
    this.isLastPage(this.currentPage);
  }
}

changePage(item) {
  this.isFirstPage(item);
  this.isLastPage(item);
  this.currentPage = item;
  this.pageChanged.next(this.currentPage);
}

isFirstPage(item) {
  if (item === 1) {
    this.previousButton.disabled = true;
    this.firstButton.disabled = true;
  } else {
    this.previousButton.disabled = false;
    this.firstButton.disabled = false;
  }
}

isLastPage(item) {
  if (item === this.totalPages) {
    this.nextButton.disabled = true;
    this.lastButton.disabled = true;
  } else {
    this.nextButton.disabled = false;
    this.lastButton.disabled = false
  }
}

calculatePages() {
  if (this.itemsPerPage >= this.totalItems) {
    return 1;
  } else {
    return Math.ceil((this.totalItems / this.itemsPerPage));
  }

}

constructor(
  private fb: FormBuilder,
  private notificationService: PoNotificationService,
) { }

ngOnInit() {
  this.isFirstPage(this.currentPage);
  this.totalPages = this.calculatePages();
}

paginaForm: FormGroup = this.fb.group({
  pagina: ['',]
});

goTo(item) {
  if (this.paginaForm.controls.pagina.value <= this.totalPages) {
    this.currentPage = this.paginaForm.controls.pagina.value;
    this.isLastPage(item)
  }
  else {
    this.notificationService.warning('Valor inserido não atende as restrições');
    return false
  }
}




}
