import { Component } from "@angular/core";
import { config, forkJoin, map } from "rxjs";
import { Pyramid } from "./pyramid";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "wrap-app";
  // manifest: any = null;
  heatmapIds: { label: string; value: string }[] | undefined;
  imageUrls: string[] | undefined;
  overlayData: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const searchParams = new URLSearchParams(
      window.location.search.toLowerCase()
    );

    const plateUrlSearchParam = searchParams.get("imageUrl".toLowerCase());
    const plateUrl =
      plateUrlSearchParam === null ? config.plateUrl : plateUrlSearchParam;
    const overlayUrlSearchParam = searchParams.get("overlayUrl".toLowerCase());
    const overlayUrl =
      overlayUrlSearchParam === null
        ? config.overlayUrl
        : overlayUrlSearchParam;

    const plateSpacingXSearchParam = searchParams.get(
      "imageSpacingX".toLowerCase()
    );
    const plateSpacingX =
      plateSpacingXSearchParam === null
        ? 100000
        : Number(plateSpacingXSearchParam);
    const plateSpacingYSearchParam = searchParams.get(
      "imageSpacingY".toLowerCase()
    );
    const plateSpacingY =
      plateSpacingYSearchParam === null
        ? 100000
        : Number(plateSpacingYSearchParam);

    const numberOfPlatesSearchParam = searchParams.get(
      "numberOfImages".toLowerCase()
    );
    const numberOfPlates =
      numberOfPlatesSearchParam === null
        ? 200
        : Number(numberOfPlatesSearchParam);

    const platesToShowSearchParam = searchParams.get(
      "imagesToShow".toLowerCase()
    );
    const platesToShow =
      platesToShowSearchParam === null
        ? null
        : JSON.parse(platesToShowSearchParam);

    const platesPerRowSearchParam = searchParams.get(
      "imagesPerRow".toLowerCase()
    );
    const platesPerRow =
      platesPerRowSearchParam === null ? 20 : Number(platesPerRowSearchParam);

    const overlayUrl$ = this.http.get(overlayUrl);
    forkJoin([overlayUrl$]).subscribe(([overlayData]: [any]) => {
      this.imageUrls = [plateUrl]; /*platesToShow === null ?
          imageData
            .slice(0, numberOfPlates)
            .map((item: { name: string }) => plateUrl + item.name) :
          platesToShow.map((item: number)=>plateUrl + imageData[item].name);*/

      //Needs the file process overlay data: Is below needed?

      // const processedData = processOverlayData({
      //   overlayData: platesToShow === null ?
      //     overlayData.slice(0, numberOfPlates) :
      //     platesToShow.map((item: any, index: number)=>overlayData[index]),
      //   baseChemicalUrl: config.baseFormulaUrl,
      //   cellSize: 3263,
      //   plateSpacingX,
      //   plateSpacingY,
      //   platesPerRow,
      //   wellsPerRow: 24,
      //   wellsPerColumn: 16,
      //   platesToShow
      // });
      this.overlayData = processedData;
      this.heatmapIds = overlayData[0].gridCellLayers
        .map((d: any) => ({ label: d.id, value: d.id }))
        .concat({ label: "None", value: null });
    });
  }
}
