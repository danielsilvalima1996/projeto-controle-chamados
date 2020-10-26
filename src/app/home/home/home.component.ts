import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PoChartType, PoPieChartSeries } from '@po-ui/ng-components';
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

  public grafico = {
    height: <number>300,
    series: <Array<PoPieChartSeries>>[],
    title: '',
    type: PoChartType.Pie
  }

  ngOnInit(): void {
    this.findHome();
  }

  private findHome() {
    this.loading = true;
    this.chamadosService
      .findHome()
      .subscribe((data) => {
        this.dadosHome = data;
        this.grafico.series = data.map((item, index) => {
          return <PoPieChartSeries>{ category: item.label, value: item.quantidade, color: item.color, tooltip: `${item.label}: ${item.quantidade}` };
        })
        console.log(this.grafico)
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.loading = false;
        })
  }

}
