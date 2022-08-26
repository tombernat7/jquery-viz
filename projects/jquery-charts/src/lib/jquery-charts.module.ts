import { NgModule } from '@angular/core';
import { JBarChart } from './chart-bar.component';
import { JColumnChart } from './chart-column.component';
import { JLineChart } from './chart-line.component';
import { JPieChart } from './chart-pie.component';


@NgModule({
  declarations: [
    JPieChart,
    JBarChart,
    JColumnChart,
    JLineChart
  ],
  imports: [
  ],
  exports: [
    JPieChart,
    JBarChart,
    JColumnChart,
    JLineChart
  ]
})
export class JqueryChartsModule { }
