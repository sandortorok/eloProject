import { DataService } from './services/data.service';
import { HttpService } from './services/http.service';
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
import { NgbdModalContent } from './bracket/modal/modal.component';
import { TeamComponent } from './bracket/team/team.component';
import { MatchComponent } from './bracket/match/match.component';
import { SingleElimBracketComponent } from './single-elim-bracket/single-elim-bracket.component';
@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ChessTabComponent,
    KlaskTabComponent,
    PingpongTabComponent,
    PlayerSortPipe,
    BracketComponent,
    NgbdModalContent,
    TeamComponent,
    MatchComponent,
    SingleElimBracketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
