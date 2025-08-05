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

  constructor(private router: Router, private projectJsonService: ProjectjsonService) { }

  allProject: any[] = [];
  totalength = 0;
  pieChart: Chart = new Chart();
  barChart: Chart = new Chart();

  ngOnInit(): void {
    this.initializePieChart();
    this.initializeBarChart();
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

  initializeBarChart(): void {
    this.barChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Department wise Status'
      },
      xAxis: {
        categories: ['Apps & Software', 'Devops', 'Data', 'Testing'] // Initial categories without percentages
      },
      yAxis: {
        title: {
          text: 'Number of Projects'
        },
        tickInterval: 5,
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
          data: [],
          color: '#a854f7'
        },
        {
          name: 'Closed',
          type: 'column',
          data: [],
          color: '#f7940a'
        },
      ]
    });
  }



  loadData(): void {
    // this.projectJsonService.getAll('projectData/Get').subscribe((data) => {
    //   const statusCounts = this.getCountsByStatus(data);
    //   this.totalength = data.length;
    //   this.updatePieChartData(statusCounts);
    //   this.updateBarChartData(data);
    // });
    this.projectJsonService.getAll('projectData/Get').subscribe({
      next: (res: any) => {
        this.allProject = res.data;
        const statusCounts = this.getCountsByStatus(this.allProject);
        this.totalength = this.allProject.length;
        this.updatePieChartData(statusCounts);
        this.updateBarChartData(this.allProject);
      }, error: (err: any) => {
        console.error('Error fetching project data:', err);
      }
    })
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

  updateBarChartData(data: any[]): void {
    const departments = ['Apps & Software', 'Devops', 'Data', 'Testing'];
    const totalCounts: { [department: string]: number } = {
      'Apps & Software': 0,
      'Devops': 0,
      'Data': 0,
      'Testing': 0
    };
    const closedCounts: { [department: string]: number } = {
      'Apps & Software': 0,
      'Devops': 0,
      'Data': 0,
      'Testing': 0
    };

    data.forEach((item) => {
      const department = item.department;
      if (totalCounts.hasOwnProperty(department)) {
        totalCounts[department]++;
        if (item.status === 'Completed') {
          closedCounts[department]++;
        }
      }
    });

    const totalData = departments.map(dept => totalCounts[dept]);
    const closedData = departments.map(dept => closedCounts[dept]);

    // Calculate percentages
    const percentages = departments.map(dept => {
      const total = totalCounts[dept];
      const closed = closedCounts[dept];
      return total > 0 ? ((closed / total) * 100).toFixed(1) : '0.00';
    });

    // Update x-axis labels with percentages
    const updatedCategories = departments.map((dept, index) => `${dept} (${percentages[index]}%)`);

    if (this.barChart.ref) {
      this.barChart.ref.update({
        xAxis: {
          categories: updatedCategories
        }
      });

      const totalSeries = this.barChart.ref.series[0];
      const closedSeries = this.barChart.ref.series[1];
      if (totalSeries) {
        totalSeries.setData(totalData, true);
      }
      if (closedSeries) {
        closedSeries.setData(closedData, true);
      }
    }
  }



  addprojects(): void {
    this.router.navigate(['Addproject']);
  }

  loginpage(): void {
    this.router.navigate(['/']);
  }

  home(): void {
    this.router.navigate(['Dashboard']);
  }
}