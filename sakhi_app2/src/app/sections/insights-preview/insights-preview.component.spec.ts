import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsPreviewComponent } from './insights-preview.component';

describe('InsightsPreviewComponent', () => {
  let component: InsightsPreviewComponent;
  let fixture: ComponentFixture<InsightsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightsPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
