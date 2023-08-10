import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WdztDirective } from "./wdzt/wdzt.directive";
import { PyramidViewerComponent } from "./pyramid-viewer/pyramid-viewer.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, WdztDirective, PyramidViewerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  exports: [WdztDirective],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
