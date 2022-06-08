import { HttpService } from './services/http.service';
import { SidebarDirective } from './directives/sidebar.directive';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsComponent } from './tabs/tabs.component';
import { ChessTabComponent } from './chess-tab/chess-tab.component';
import { HttpClientModule } from '@angular/common/http';
import { KlaskTabComponent } from './klask-tab/klask-tab.component';
import { PingpongTabComponent } from './pingpong-tab/pingpong-tab.component';
import { PlayerSortPipe } from './pipes/player-sort.pipe';
import { BracketComponent } from './bracket/bracket.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SidebarDirective,
    TabsComponent,
    ChessTabComponent,
    KlaskTabComponent,
    PingpongTabComponent,
    PlayerSortPipe,
    BracketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
