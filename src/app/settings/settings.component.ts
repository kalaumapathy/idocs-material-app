import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild('usageChartCanvas') usageChartCanvas!: ElementRef<HTMLCanvasElement>;
  private usageChart: Chart | undefined;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.renderChart();
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  renderChart(): void {
    if (this.usageChartCanvas && this.usageChartCanvas.nativeElement) {
      const ctx = this.usageChartCanvas.nativeElement.getContext('2d');
      if (ctx) {
        this.usageChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Documents Processed',
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: 'rgba(96, 125, 139, 0.6)', // Blue-Grey 600 with opacity
              borderColor: 'rgba(69, 90, 100, 1)', // Blue-Grey 800
              borderWidth: 1,
              borderRadius: 4,
            },
            {
              label: 'AI Queries',
              data: [28, 48, 40, 19, 86, 27],
              backgroundColor: 'rgba(255, 193, 7, 0.6)', // Amber A400 with opacity
              borderColor: 'rgba(255, 160, 0, 1)', // Amber A700
              borderWidth: 1,
              borderRadius: 4,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.1)'} // Light grid lines
              },
              x: {
                grid: { display: false }
              }
            },
            plugins: {
              legend: {
                labels: { color: '#424242' } // Grey 800
              },
              tooltip: {
                backgroundColor: '#303030', // Dark grey
                titleColor: '#f5f5f5', // Light grey
                bodyColor: '#e0e0e0', // Lighter grey
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += context.parsed.y;
                    }
                    const maxChars = 20;
                    let wrappedLabel = '';
                    for (let i = 0; i < label.length; i += maxChars) {
                      wrappedLabel += label.substring(i, i + maxChars) + '\n';
                    }
                    return wrappedLabel.trim().split('\n');
                  }
                }
              }
            }
          }
        });
      }
    }
  }
}
