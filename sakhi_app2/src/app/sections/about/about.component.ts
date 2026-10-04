import { Component, OnInit } from '@angular/core';
import { AboutData } from 'src/app/models/about.model';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
  })
  export class AboutComponent implements OnInit {
  data?: AboutData;

  loading = true;
  error = false;

  constructor(
    private aboutService: AboutService
  ) {}

  ngOnInit(): void {

    this.aboutService.getAboutData().subscribe({

      next: (d) => {

        // Full About page → show all team members
        this.data = d;

        this.loading = false;
      },

      error: () => {

        this.error = true;
        this.loading = false;

      }

    });

  }
  }
