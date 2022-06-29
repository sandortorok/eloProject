import { SaveModal } from './modals/save-modal/save-modal.component';
import { WinModal } from './modals/win-modal/win-modal.component';
import { DataService } from './services/data.service';
import { HttpService } from './services/http.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsComponent } from './tabs/tabs.component';
import { ChessTabComponent } from './elo-tabs/chess-tab/chess-tab.component';
import { HttpClientModule } from '@angular/common/http';
import { KlaskTabComponent } from './elo-tabs/klask-tab/klask-tab.component';
import { PingpongTabComponent } from './elo-tabs/pingpong-tab/pingpong-tab.component';
import { PlayerSortPipe } from './pipes/player-sort.pipe';
import { BracketComponent } from './bracket/bracket.component';
import { FormsModule } from '@angular/forms';
import { NgbdModalContent } from './bracket/modal/modal.component';
import { TeamComponent } from './bracket/team/team.component';
import { MatchComponent } from './bracket/match/match.component';
import { SEBracketComponent } from './se-bracket/se-bracket.component';
import { DEBracketComponent } from './de-bracket/de-bracket.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NeonButtonComponent } from './neon-button/neon-button.component';
import { LoadModal } from './modals/load-modal/load-modal.component';
import { NewModal } from './modals/new-modal/new-modal.component';
import { MenuComponent } from './menu/menu.component';
import { HexComponent } from './menu/hex/hex.component';
import { RoundsPipe } from './pipes/rounds.pipe';
import { SechampionsPipe } from './pipes/sechampions.pipe';
import { RRBracketComponent } from './rr-bracket/rr-bracket.component';
import { sortScorePipe } from './pipes/sort-score.pipe';

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
    SpinnerComponent,
    NeonButtonComponent,
    SEBracketComponent,
    WinModal,
    SaveModal,
    LoadModal,
    NewModal,
    DEBracketComponent,
    MenuComponent,
    HexComponent,
    RoundsPipe,
    SechampionsPipe,
    RRBracketComponent,
    sortScorePipe,
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
