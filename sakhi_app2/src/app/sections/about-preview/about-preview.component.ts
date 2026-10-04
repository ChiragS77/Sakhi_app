import { Component, OnInit } from '@angular/core';
import { AboutData } from 'src/app/models/about.model';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about-preview',
  templateUrl: './about-preview.component.html',
  styleUrls: ['./about-preview.component.css']
})
export class AboutPreviewComponent implements OnInit {

  data?: AboutData;

  loading = true;
  error = false;


  constructor(
    private aboutService: AboutService
  ) {}


  ngOnInit(): void {

    this.aboutService.getAboutData().subscribe({

      next: (d) => {

        /*
         * Show all team members.
         *
         * Previously:
         * team: d.team?.slice(0, 2) ?? []
         *
         * That was limiting the preview to only 2 people.
         */
        this.data = {
          ...d,
          team: d.team ?? []
        };

        this.loading = false;

      },


      error: () => {

        this.error = true;
        this.loading = false;

      }

    });

  }

}