import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts'; // Assuming you've imported and configured angular-highcharts properly
import { ProjectjsonService } from '../projectjson.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'] // Corrected property name for styles
})
export class GraphComponent implements OnInit {

  constructor(private router: Router, private projectJsonService: ProjectjsonService) {}

  allProject: any[] = [];
  pieChart: Chart = new Chart();

  ngOnInit(): void {
    this.initializePieChart();
    this.loadData();
  }

  initializePieChart(): void {
    this.pieChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          innerSize: '99%',
          borderWidth: 15,
          borderColor: '',
          slicedOffset: 5,
          dataLabels: {
            connectorWidth: 0,
          },
        },
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'Flow',
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'pie',
          data: [
            { name: 'Registered', y: 0, color: '#0000ff' },
            { name: 'In Progress', y: 0, color: '#FF8C00' },
            { name: 'Completed', y: 0, color: '#00ff00' },
            { name: 'Cancelled', y: 0, color: '#FF0000' },
          ]
        }
      ]
    });
  }

  loadData(): void {
    this.projectJsonService.getAll().subscribe((data) => {
      const statusCounts = this.getCountsByStatus(data);
      this.updatePieChartData(statusCounts);
    });
  }

  getCountsByStatus(data: any[]): { [status: string]: number } {
    const counts: { [status: string]: number } = {
      'Registered': 0,
      'In progress': 0,
      'Completed': 0,
      'Cancelled': 0
    };

    data.forEach((item) => {
      const status = item.status;
      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    });

    return counts;
  }

  updatePieChartData(statusCounts: { [status: string]: number }): void {
    const seriesData = [];
    for (const status in statusCounts) {
      if (statusCounts.hasOwnProperty(status)) {
        seriesData.push({
          name: status,
          y: statusCounts[status],
        });
      }
    }
    // Update the pie chart series data
    if (this.pieChart.ref) {
      const chartSeries = this.pieChart.ref.series[0];
      if (chartSeries) {
        chartSeries.setData(seriesData, true);
      }
    }
  }


   barChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Double Bar Chart'
    },
    xAxis: {
      categories: ['Apps and Software', 'Devops', 'Data', 'Testing']
    },
    yAxis: {
      title: {
        text: 'Number of Projects'
      }
    },
    plotOptions: {
      column: {
        grouping: true,
        shadow: false,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'Total',
        type: 'column',
        data: [9, 8, 8, 6],
        color: '#a854f7'
      },
      {
        name: 'Closed',
        type: 'column',
        data: [5, 3, 2, 4],
        color: '#f7940a'
      },
      
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
