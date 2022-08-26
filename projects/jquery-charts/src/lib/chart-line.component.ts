import { Directive, ElementRef, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartData } from './chart.model';
import { ChartConfig } from './chart.model';

@Directive({
  selector: '[jline-chart]'
})
export class JLineChart {

  private _conf: ChartConfig = {};
  private chart: any;

  constructor(private el: ElementRef) { }

  @Input('config')
  set config(conf: ChartConfig) {
    this._conf = conf;
    this.chart = (Highcharts as any).chart(this.el.nativeElement, {
      title: { text: conf.title },
      subtitle: {text: conf.subtitle},
      xAxis: { title: { text: this._conf.xtitle } },
      yAxis: { title: { text: this._conf.ytitle }, allowDecimals: false },
      plotOptions: {
        series: {
          dataLabels: { enabled: true, pointFormat: '<b>{point.y:,.0f}</b>' }
        }
      },
      tooltip: { valueDecimals: 2 },
      credits: { enabled: false },
      series: []
    });
    this.chart.hideLoading();
  }

  @Input('data')
  set data(queries: ChartData[]) {
    console.log('queries', queries)
    let fn =  (o:any) => o.revisionYear + '-' + o.revisionMonth; 
    if (queries?.length) {
      const categs = [...new Set(queries.flatMap(o=> o.data).map(fn))].sort();
      const series =  queries.flatMap(q => {
        return q.adapters.map(adp=> {
          const data = categs.map(c=>{ 
            var res = q.data.find(o=> fn(o) === c)
            return res ? res[adp.field] : null;
          })
           return {'name': adp.label, 'color': adp.color, 'data': data};
        });
      });
      console.log(series, categs)
      this.chart.update({ series: series, xAxis: { categories: categs } }, true, true);
    }
    else{
      this.chart.update({ series: []}, true, true);
    }
    this.chart.hideLoading();
  }
}