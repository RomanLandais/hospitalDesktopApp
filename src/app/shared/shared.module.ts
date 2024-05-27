import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComServerService } from './services/com-server.service';
import { TokenService } from './services/token.service';

@NgModule({
  declarations: [WebviewDirective],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [TranslateModule, WebviewDirective, FormsModule, CommonModule],
  providers: [ComServerService, TokenService],
})
export class SharedModule {}
