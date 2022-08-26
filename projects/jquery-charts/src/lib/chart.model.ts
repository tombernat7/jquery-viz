import * as Highcharts from 'highcharts';

export interface ChartConfig {

  title?: string;
  subtitle?: string;
  xtitle?: string;
  xLabel?: string;
  ytitle?: string;
  adapters?: DataMapper[];
}

export interface DataMapper {
  field: string;
  label: string;
  color?: string;
}

export interface ChartData {
  adapters: DataMapper[];
	data : any[];
}

export function defaultColors(){
  return Highcharts.getOptions().colors || [];
}
