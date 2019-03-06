import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Global } from '../shared/Global';

import { MockBackend } from '@angular/http/testing';
import {HttpModule,Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [ { provide: XHRBackend, useClass: MockBackend },]
  }));

  it('should be created', () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service).toBeTruthy();
  });

  it('should have getAllProduct function',
    inject([ProductService], (service: ProductService) => {
      expect(service.getAllProduct).toBeTruthy();
    }));  

  it('should return an Observable<Array<Product>>',
    inject([ProductService], (productService) => {
      productService.getAllProduct().subscribe((products) => {
        expect(products.length).toBe(5);
        expect(products[0].Id).toEqual(1);
        expect(products[1].Id).toEqual(2);
        expect(products[2].Id).toEqual(3);
        expect(products[3].Id).toEqual(4);
        expect(products[4].Id).toEqual(5);
      });
    }));
   
    it('should return an Observable<Array<Product>> using mock',
      inject([ProductService, XHRBackend], (productService, mockBackend) => {

        const mockResponse = {
          data: [
            { id: 1, modelcode: 'SM-S8ABCD13', productname: 'Galaxy S3', serialnumber: 'SN00000001' },
            { id: 2, modelcode: 'SM-S8ABCD17', productname: 'Galaxy S7', serialnumber: 'SN00000002' },
            { id: 3, modelcode: 'SM-S8ABCD18', productname: 'Galaxy S8', serialnumber: 'SN00000003' },
            { id: 4, modelcode: 'SM-S8ABCD19', productname: 'Galaxy S9', serialnumber: 'SN00000004' },
            { id: 5, modelcode: 'SM-S8ABCD10', productname: 'Galaxy S10',serialnumber: 'SN00000005' },
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        productService.getAllProduct().subscribe((products) => {
          expect(products.length).toBe(5);
          expect(products[0].productname).toEqual('Galaxy S3');
          expect(products[1].productname).toEqual('Galaxy S7');
          expect(products[2].productname).toEqual('Galaxy S8');
          expect(products[3].productname).toEqual('Galaxy S9');
          expect(products[4].productname).toEqual('Galaxy S10');
        });

      }));

});
