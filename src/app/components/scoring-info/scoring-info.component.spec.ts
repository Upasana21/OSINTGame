import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringInfoComponent } from './scoring-info.component';

describe('ScoringInfoComponent', () => {
  let component: ScoringInfoComponent;
  let fixture: ComponentFixture<ScoringInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoringInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoringInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
