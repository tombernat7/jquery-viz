import { Directive, ElementRef, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartData } from './chart.model';
import { ChartConfig } from './chart.model';

@Directive({
  selector: '[jpie-chart]'
})
export class JPieChart {

  private _conf: ChartConfig = {};
  private chart: any;

  constructor(private el: ElementRef) { }

  @Input('config')
  set config(conf: ChartConfig) {
    this._conf = conf;
    this.chart = (Highcharts as any).chart(this.el.nativeElement, {
      chart: { type: 'pie' },
      title: { text: conf.title},
      subtitle: {text: conf.subtitle},
      plotOptions: {
        pie: {
          allowPointSelect: true, cursor: 'pointer',
          showInLegend: true,
          dataLabels: {
            enabled: true,
            distance: -50,
            pointFormat: '<b>{point.percentage:,.0f}%</b>',
            filter: { property: 'percentage', operator: '>', value: 3 }
          }
        }
      },
      credits: { enabled: false },
      series: [],
      
    });
    this.chart.showLoading();
  }

  @Input('data')
  set data(queries: ChartData[]) {
    console.log('queries', queries)
    let fn =  (o:any) => o.revisionYear + '-' + o.revisionMonth; 
    if (queries?.length) {
      const categs = [...new Set(queries.flatMap(o=> o.data).map(fn))].sort();
      const series = queries.flatMap(q => {
        return q.adapters.map(adp => {
          const data = q.data.find(o => fn(o) === categs[categs.length-1]);
          return {'name': adp.label, 'color': adp.color, 'y': data[adp.field]};
        });
      });
      this.chart.update({ series: [{ name: this._conf.ytitle, data: series }], xAxis: { categories: categs } }, true, true);
    }
    else{
      this.chart.update({ series: []}, true, true);
    }
    this.chart.hideLoading();
  }
}
