import { Observable } from "rxjs";
import { PyramidService } from "./pyramid.service";

export interface DataService<T, U> {
  getById(id: string): Observable<T>;
  get(params: any): Observable<U>;
  getByNameContainingIgnoreCase(params: any, name: string): Observable<U>;
}

export const dataMap = new Map<string, any>([["pyramid", PyramidService]]);
