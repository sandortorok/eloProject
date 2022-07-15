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
import { HttpClientModule } from '@angular/common/http';
import { SortPipe } from './pipes/sort.pipe';
import { FormsModule } from '@angular/forms';
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
import { GameTypePipe } from './pipes/game-name.pipe';
import { EloBracketComponent } from './elo-bracket/elo-bracket.component';
import { GroupBracketComponent } from './group-bracket/group-bracket.component';
import { CommonModule } from '@angular/common';
import { GroupNavigatorComponent } from './group-navigator/group-navigator.component';
import { GroupPipe } from './pipes/group.pipe';
import { GroupNamePipe } from './pipes/group-name.pipe';
import { LoginFormComponent } from './login-form/login-form.component';
import { InfoModal } from './modals/info-modal/info-modal.component';
import { WaitScreenComponent } from './wait-screen/wait-screen.component';
import { SwissBracketComponent } from './swiss-bracket/swiss-bracket.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    SortPipe,
    SpinnerComponent,
    NeonButtonComponent,
    SEBracketComponent,
    WinModal,
    SaveModal,
    LoadModal,
    NewModal,
    InfoModal,
    DEBracketComponent,
    MenuComponent,
    HexComponent,
    RoundsPipe,
    SechampionsPipe,
    RRBracketComponent,
    sortScorePipe,
    GameTypePipe,
    EloBracketComponent,
    GroupBracketComponent,
    GroupNavigatorComponent,
    GroupPipe,
    GroupNamePipe,
    LoginFormComponent,
    WaitScreenComponent,
    SwissBracketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [HttpService, DataService, SortPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
