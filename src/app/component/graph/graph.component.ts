import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts'; // Assuming you've imported and configured angular-highcharts properly

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'] // Corrected property name for styles
})
export class GraphComponent {

  constructor (private router: Router) {}

  pieChart = new Chart({
    chart:{
      type: 'pie',
      plotShadow: false,
    },

    credits:{
      enabled: false,
    },
    plotOptions:{
      pie:{
        innerSize: '99%',
        borderWidth: 15,
        borderColor: '',
        slicedOffset: 5,
        dataLabels:{
          connectorWidth: 0,
        },
      },
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'Diseases',
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type:'pie',
        data:[
          { name :'COVID 19', y:1, color: '#eeeeee'},
          { name :'HIV AIDS', y:2, color: '#393e46'},
          { name :'EBOLA', y:3, color: '#00adb5'},
          { name :'DISPORA', y:4, color: '#FFA500'},
          { name :'DIABETES', y:5, color: '#506ef9'},
        ]
      }
    ]
  })

  barChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Number of Fruits'
      }
    },
    series: [
      {
        type:'column',
        data:[
          { name :'COVID 19', y:1, color: '#FF00FF'},
          { name :'HIV AIDS', y:2, color: '#00FF00'},
          { name :'EBOLA', y:3, color: '#808080'},
        ]
      }
    ]
  });

  addprojects(): void{
    this.router.navigate(['Addproject'])
  }

  loginpage(): void{
    this.router.navigate(['/'])
  }

  home(): void{
    this.router.navigate(['Dashboard'])
  }
}
