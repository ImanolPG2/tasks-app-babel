import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailTackPage } from './detail-tack.page';

describe('DetailTackPage', () => {
  let component: DetailTackPage;
  let fixture: ComponentFixture<DetailTackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
