import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';

interface UserChart {
  name: string;
  type: ChartType;
  data: ChartData;
  width: number;
  height: number;
}

@Component({
  selector: 'app-chart-create',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './chart-create.component.html',
  styleUrls: ['./chart-create.component.css'],
})
export class ChartCreateComponent {
  chartName = '';
  chartType: ChartType | '' = '';
  submitted = false;
  isEditingIndex: number | null = null;

  chartTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
  ];

  charts: UserChart[] = [];

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  getSampleData(type: ChartType): ChartData {
    if (type === 'pie') {
      return {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [30, 50, 20],
            backgroundColor: this.getRandomColors(3),
          },
        ],
      };
    }
    return {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Data',
          data: [10, 20, 40, 60, 75, 62, 79, 81, 32, 45, 69, 46],
          backgroundColor: this.getRandomColors(1),
          borderColor: '#1E88E5',
          fill: type === 'bar',
        },
      ],
    };
  }

  getRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(color);
    }
    return colors;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.chartName || !this.chartType) return;

    const chartData = this.getSampleData(this.chartType as ChartType);

    if (this.isEditingIndex !== null) {
      this.charts[this.isEditingIndex] = {
        name: this.chartName,
        type: this.chartType as ChartType,
        data: chartData,
        width: 400,
        height: 300,
      };
      this.isEditingIndex = null;
    } else {
      this.charts.push({
        name: this.chartName,
        type: this.chartType as ChartType,
        data: chartData,
        width: 400,
        height: 300,
      });
    }

    this.resetForm();
  }

  editChart(index: number) {
    const chart = this.charts[index];
    this.chartName = chart.name;
    this.chartType = chart.type;
    this.isEditingIndex = index;
  }

  deleteChart(index: number) {
    this.charts.splice(index, 1);
  }

  resizeChart(index: number, increase: boolean) {
    const chart = this.charts[index];
    const change = increase ? 50 : -50;
    chart.width += change;
    chart.height += change;
  }

  resetForm() {
    this.chartName = '';
    this.chartType = '';
    this.submitted = false;
  }
}
