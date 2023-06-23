import { Component, OnInit } from '@angular/core';
import { Pyramid } from '../pyramid';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { PyramidService } from '../services/pyramid.service';

@Component({
  selector: 'app-pyramid-viewer',
  templateUrl: './pyramid-viewer.component.html',
  styleUrls: ['./pyramid-viewer.component.css']
})
export class PyramidViewerComponent implements OnInit {
  pyramid: Pyramid = new Pyramid();
  manifest: any = null;
  pyramidId!: Observable<string>;

  constructor(private pyramidService: PyramidService) { }

  ngOnInit() {
    this.getPyramid()
      .subscribe(pyramid => {
        this.pyramid = pyramid;
        this.getManifest(pyramid);
      }, error => {
        console.log('pyramid error', error);
      });
  }

  getPyramid() {
    return this.pyramidId.pipe(
      switchMap(id => this.pyramidService.getById(id))
    );
  }

  getManifest(pyramid: Pyramid) {
    this.pyramidService.getPyramidManifest(pyramid).subscribe((manifest: any) => this.manifest = manifest);
  }

}
