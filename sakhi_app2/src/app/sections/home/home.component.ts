import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  

 stats = [
    {
      value: 500,
      suffix: '+',
      label: 'Businesses Served'
    },
    {
      value: 20,
      suffix: '+',
      label: 'Professional Services'
    },
    {
      value: 5,
      suffix: '+',
      label: 'Years of Experience'
    },
    {
      value: 100,
      suffix: '%',
      label: 'Commitment to Service'
    }
  ];

  display: number[] = [0, 0, 0, 0];

  private animationFrame?: number;


  ngOnInit(): void {

    this.animateCounters();

  }


  private animateCounters(): void {

    const duration = 1600;

    const start = performance.now();


    const tick = (now: number) => {

      const progress = Math.min(
        (now - start) / duration,
        1
      );


      /*
       * Ease-out cubic
       * Starts quickly and slows down naturally.
       */
      const eased =
        1 - Math.pow(1 - progress, 3);


      this.display = this.stats.map((stat) => {

        const currentValue =
          stat.value * eased;


        if (Number.isInteger(stat.value)) {

          return Math.round(currentValue);

        }


        return Math.round(currentValue * 10) / 10;

      });


      if (progress < 1) {

        this.animationFrame =
          requestAnimationFrame(tick);

      }

    };


    this.animationFrame =
      requestAnimationFrame(tick);

  }


  ngOnDestroy(): void {

    if (this.animationFrame !== undefined) {

      cancelAnimationFrame(
        this.animationFrame
      );

    }

  }

  heroTransform = 'translate3d(0, 0, 0)';

onHeroMouseMove(event: MouseEvent): void {

  const target = event.currentTarget as HTMLElement;

  const rect = target.getBoundingClientRect();

  const x =
    (event.clientX - rect.left) /
    rect.width - 0.5;

  const y =
    (event.clientY - rect.top) /
    rect.height - 0.5;

  const moveX = x * 14;
  const moveY = y * 14;

  this.heroTransform =
    `translate3d(${moveX}px, ${moveY}px, 0)`;
}


resetHeroPosition(): void {

  this.heroTransform =
    'translate3d(0, 0, 0)';
}

}
