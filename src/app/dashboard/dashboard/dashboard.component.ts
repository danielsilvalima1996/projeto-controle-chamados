import { Component, OnInit } from '@angular/core';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constValue = {
    analista: <number>null
  }

  constructor(
    private analistaService: AnalistaService
  ) { }

  ngOnInit() {
    this.totalAnalistas();
  }

  private totalAnalistas() {
    this.analistaService
      .totalAnalistas()
      .subscribe((data) => {
        this.constValue.analista = data;
      })
  }

}
