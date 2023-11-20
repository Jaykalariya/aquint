export let echartsHTML1 =
'<div echarts class="echart-height" [options]="echartLineBarOption"></div>'

export let echartsTS1 =
`import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
let root:any = document.querySelector(':root')
const primaryColor = getComputedStyle(root)?.getPropertyValue("--primary-bg-color")
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public echartLineBarOption: EChartsOption = {
    grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25'
    },
    tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer: {
            label: {
                show: false,
            }
        }
    },
    xAxis: {
        type: 'category',
        data: ['2007-2008', '2009-2010', '2011-2012', '2013-2014', '2015-2016'],
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#8e9cad'
        },

    },
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#8e9cad'
        }
    },
    series: [
        {
            name: 'sales',
            type: 'bar',
            data: [10, 15, 9, 18, 10, 15]
        },
        {
            name: 'profit',
            type: 'line',
            smooth: true,
            data: [8, 5, 25, 10, 10]
        },
        {
            name: 'growth',
            type: 'bar',
            data: [10, 14, 10, 15, 9, 25]
        }
    ],
    color: [primaryColor, '#01b8ff', ]
}}`


