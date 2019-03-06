import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../services/product.service';
import { Inject } from '@angular/core';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let service: ProductService;
  let spy: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        HttpClientTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.debugElement.componentInstance;   
    fixture.detectChanges();
  });

  it('should create product component', () => {
    expect(component).toBeTruthy();
  });

  it('should have as product table', async(() => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement;
    expect(app.querySelector('table').id).toContain('product');
  })); 
  
  it('Service injected via inject and TestBed.get should be the same instance',
    inject([ProductService], (injectService: ProductService) => {
    expect(injectService).toBe(fixture.debugElement.injector.get(ProductService));
    }));
});
