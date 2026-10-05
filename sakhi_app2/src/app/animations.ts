import { trigger, transition, style, query, animate } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(12px)' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))
    ], { optional: true })
  ])
]);