import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery: string = '';
  activeFilters: string[] = ['PDF', 'Classified'];

  removeFilter(filter: string): void {
    this.activeFilters = this.activeFilters.filter(f => f !== filter);
  }

  addFilter(): void {
    // Mock adding a filter
    const newFilter = prompt('Enter new filter tag:');
    if (newFilter && !this.activeFilters.includes(newFilter)) {
      this.activeFilters.push(newFilter);
    }
  }
}
