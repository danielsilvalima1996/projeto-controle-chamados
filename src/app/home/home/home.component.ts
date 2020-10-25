import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/interfaces/home.model';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private chamadosService: ChamadosService) { }

  public dadosHome: Array<Home> = [];

  public loading: boolean;

  ngOnInit(): void {
    this.findHome();
  }

  private findHome() {
    this.loading = true;
    this.chamadosService
      .findHome()
      .subscribe((data) => {
        this.dadosHome = data;
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.loading = false;
        })
  }

}
