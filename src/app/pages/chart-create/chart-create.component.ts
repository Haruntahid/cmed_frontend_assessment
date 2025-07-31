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
  colorScheme: string[];
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
  selectedScheme: string[] = [];
  submitted = false;
  isEditingIndex: number | null = null;

  chartTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
  ];

  colorSchemes: { name: string; colors: string[] }[] = [
    { name: 'Vibrant', colors: ['#f1547d', '#6b478d', '#f7b733', '#4ABDAC'] },
    { name: 'Cool Blue', colors: ['#1E88E5', '#42A5F5', '#90CAF9', '#BBDEFB'] },
    { name: 'Dark Mode', colors: ['#212121', '#424242', '#616161', '#757575'] },
    { name: 'Nature', colors: ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107'] },
    { name: 'Pastel', colors: ['#ffd1dc', '#d1c4e9', '#b2ebf2', '#c8e6c9'] },
  ];

  charts: UserChart[] = [];

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
  };

  getSampleData(type: ChartType, colors: string[]): ChartData {
    if (type === 'pie') {
      return {
        labels: ['Red', 'Green', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [30, 30, 20, 20],
            backgroundColor: colors,
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
          backgroundColor: type === 'bar' ? colors : undefined,
          fill: type === 'bar',
        },
      ],
    };
  }

  onSubmit() {
    this.submitted = true;

    if (
      !this.chartName ||
      !this.chartType ||
      !this.selectedScheme ||
      this.selectedScheme.length === 0
    ) {
      return; // stop if invalid inputs
    }

    const chartData = this.getSampleData(
      this.chartType as ChartType,
      this.selectedScheme
    );

    if (this.isEditingIndex !== null) {
      this.charts[this.isEditingIndex] = {
        name: this.chartName,
        type: this.chartType as ChartType,
        data: chartData,
        width: 400,
        height: 300,
        colorScheme: this.selectedScheme,
      };
      this.isEditingIndex = null;
    } else {
      this.charts.push({
        name: this.chartName,
        type: this.chartType as ChartType,
        data: chartData,
        width: 400,
        height: 300,
        colorScheme: this.selectedScheme,
      });
    }

    this.resetForm();
  }

  editChart(index: number) {
    const chart = this.charts[index];
    this.chartName = chart.name;
    this.chartType = chart.type;
    this.selectedScheme = chart.colorScheme;
    this.isEditingIndex = index;
  }

  deleteChart(index: number) {
    this.charts.splice(index, 1);
  }

  resizeChart(index: number, increase: boolean) {
    const chart = this.charts[index];
    const change = increase ? 50 : -50;
    chart.width = Math.max(200, chart.width + change);
    chart.height = Math.max(150, chart.height + change);
  }

  resetForm() {
    this.chartName = '';
    this.chartType = '';
    this.selectedScheme = [];
    this.submitted = false;
  }

  goBack() {
    window.history.back(); // simple back navigation for back button
  }
}
