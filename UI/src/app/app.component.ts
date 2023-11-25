import { Component, HostListener } from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';
import { RouteData } from './shared/interfaces/routingParameters';
import { ResolveStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommunicationService } from './shared/services/communication/communication.service';
import { CommonHelperService } from './shared/services/common-helper/common-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'AQUINT';
  routeData: RouteData;
  selectedModule: string;

  scrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 74;
  }

  constructor(
    private router: Router,
    private titleService: Title,
    private communicationService: CommunicationService,
    private commonHelperService: CommonHelperService
  ){
    this.subscribeNavigation();
  }

  ngOnInit() {
    fromEvent(window, 'load').subscribe(() => document.querySelector('#glb-loader')?.classList.remove('loaderShow'));
  }

  subscribeNavigation() {
    this.router.events.pipe(
      filter((event: any) => event instanceof ResolveStart),
      map((event:any) => {
        let data = null;
        let route = event['state'].root;
        while (route) {
          data = route.data || data;
          route = route.firstChild;
        }
        return data;
      }),
    ).subscribe(result => {
      this.routeData = result;
      if (this.routeData) {
        this.title = this.routeData.title;
        this.titleService.setTitle(this.title);
        this.selectedModule = this.routeData.selectedModule;
        // if(this.selectedModule == "schools"
          // || this.selectedModule == "programs"
          // || this.selectedModule == "sessions"
          // || this.selectedModule == "cart"
          // || this.selectedModule == "embedauthorize"
          // || this.selectedModule == "embedlogout"
          // || this.selectedModule == "checkout"
          // || this.selectedModule == "payment-success"
          // || this.selectedModule == "payment-cancel"
        // ){
        //   this.loadEmbedSpecificCSS();
        // }
      }
    });
  }
}
