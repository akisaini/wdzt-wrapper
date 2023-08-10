import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PyramidViewerComponent } from "./pyramid-viewer.component";

describe("PyramidViewerComponent", () => {
  let component: PyramidViewerComponent;
  let fixture: ComponentFixture<PyramidViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PyramidViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramidViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
