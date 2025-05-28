import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface FileItem {
  name: string;
  type: 'docs' | 'images' | 'videos';
  size: string;
  date: string;
  icon: string; // Material icon name
}

@Component({
  selector: 'app-files',
  standalone: false,
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  files: FileItem[] = [
    { name: 'Project Proposal.pdf', type: 'docs', size: '2MB', date: 'Today', icon: 'picture_as_pdf' },
    { name: 'Quarterly Report.docx', type: 'docs', size: '1.5MB', date: 'Yesterday', icon: 'description' },
    { name: 'Team Photo.jpg', type: 'images', size: '800KB', date: '3 days ago', icon: 'image' },
    { name: 'Product Demo.mp4', type: 'videos', size: '25MB', date: 'Last Week', icon: 'movie' }
  ];
  filteredFiles: FileItem[] = [...this.files];
  activeFilter: string = 'all';

  constructor(private router: Router) {}

  filterFiles(type: string): void {
    this.activeFilter = type;
    if (type === 'all') {
      this.filteredFiles = [...this.files];
    } else {
      this.filteredFiles = this.files.filter(file => file.type === type);
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
