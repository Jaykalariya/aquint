import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {  Subscription } from 'rxjs';
import { SwitcherService } from 'src/app/shared/services/switcher.service';
import * as switcher from 'src/app/shared/layout-components/switcher/switcher'
@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  layoutSub: Subscription;

  body = document.querySelector('body');

  @ViewChild('switcher', { static: false }) switcher!: ElementRef;
  constructor(
    public renderer: Renderer2,
    public switcherServic: SwitcherService
  ) {
    this.layoutSub = switcherServic.changeEmitted.subscribe((value) => {
      if (value) {
        this.renderer.addClass(this.switcher.nativeElement.firstElementChild,'active');
        this.renderer.setStyle(this.switcher.nativeElement.firstElementChild,'right','0px');
        value = true;
      } else {
        this.renderer.removeClass(this.switcher.nativeElement.firstElementChild,'active');
        this.renderer.setStyle(this.switcher.nativeElement.firstElementChild,'right','-270px');
        value = false;
      }
      document.querySelector(".slide-leftRTL")?.classList.add("d-none")
      document.querySelector(".slide-rightRTL")?.classList.add("d-none")
    });

  }
  ngOnInit(): void {
    switcher.localStorageBackUp();
    switcher.customClickFn();
    switcher.updateChanges();
    // document.querySelector('#myonoffswitch1').checked = true
    if(document.body.classList.contains("transparent-mode") || document.body.classList.contains("dark-mode")){
      // console.log("true")
      let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
      light.checked = false;
    }
    else{

      let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
      light.checked = true;

    }
  }
  reset(){
    let btnlight = document.getElementById('myonoffswitch1') as HTMLInputElement;
    btnlight.checked = true;
    let lightmenu = document.getElementById('myonoffswitch3') as HTMLInputElement;
    lightmenu.checked = true;
    let vertical = document.getElementById('myonoffswitch34') as HTMLInputElement;
    vertical.checked = true;
    let ltr = document.getElementById('myonoffswitch54') as HTMLInputElement;
    ltr.checked = true;
    let lightheader = document.getElementById('myonoffswitch6') as HTMLInputElement;
    lightheader.checked = true;
    let fullwidth = document.getElementById('myonoffswitch9') as HTMLInputElement;
    fullwidth.checked = true;
    let fixed = document.getElementById('myonoffswitch11') as HTMLInputElement;
    fixed.checked = true;

    localStorage.clear();
    let html:any = document.querySelector('html')
    let body = document.querySelector('body')
    html.style = '';
    body?.classList.remove('rtl');
    body?.classList.remove('dark-mode');
    body?.classList.remove('light-header');
    body?.classList.remove('dark-header');
    body?.classList.remove('color-header');
    body?.classList.remove('gradient-header');
    body?.classList.remove('light-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('dark-menu');
    body?.classList.remove('gradient-menu');
    body?.classList.remove('layout-boxed');
    body?.classList.remove('scrollable-layout');
    body?.classList.remove('bg-img1');
    body?.classList.remove('bg-img2');
    body?.classList.remove('bg-img3');
    body?.classList.remove('bg-img4');
    body?.classList.remove('transparent-mode');
    switcher.updateChanges();
    switcher.checkOptions();
    html.setAttribute('dir', 'ltr');
    let styleId = document.querySelector('#style');
    styleId?.setAttribute('href','./assets/plugins/bootstrap/css/bootstrap.css');
    localStorage.removeItem('Slicahorizontal')
    localStorage.removeItem('SlicahorizontalHover')
    let mainContent: any = document.querySelector('.main-content');
    let mainContainer: any = document.querySelectorAll('.main-container');
    let appSidebar: any = document.querySelector('.app-sidebar');
    let header: any = document.querySelector('.header');
    let mainSidemenu: any = document.querySelector('.main-sidemenu');
    mainContent?.classList.add('app-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; },i: any)=>{
      e.classList.add('container-fluid')
    })
    header?.classList.add('app-header');
    body?.classList.add('sidebar-mini');
    //remove
    body?.classList.remove('horizontal');
    body?.classList.remove('horizontal-hover');
    appSidebar?.classList.remove('horizontal-main');
    mainSidemenu?.classList.remove('container');
    mainContent?.classList.remove('hor-content');
    header?.classList.remove('hor-header');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; },i: any)=>{
      e.classList.remove('container')
    })
    document.querySelector('.slide-left')?.classList.add('d-none');
    document.querySelector('.slide-right')?.classList.add('d-none');
    document.querySelector('.slide-leftRTL')?.classList.add('d-none');
    document.querySelector('.slide-rightRTL')?.classList.add('d-none');
  }

public  color1:string='#0052cc'
  public color2: string = '#0052cc';
  public color3: string = '#0052cc';
  public color4: string = '#0052cc';
  public color13: string = '#0052cc';

  public dynamicDarkPrimary(data: any): void {
    this.color2 = data.color;

    const dynamicPrimaryDark = document.querySelectorAll(
      'input.color-primary-dark'
    );

    switcher.dynamicDarkPrimaryColor(dynamicPrimaryDark, this.color2);

    sessionStorage.setItem('dark-primary-color', this.color2);
    sessionStorage.setItem('dark-primary-hover', this.color2);
    sessionStorage.setItem('dark-primary-border', this.color2);
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;
    localStorage.setItem('Slicadark-mode', 'true')
    localStorage.removeItem('Slicalight-mode')

    // Adding
    this.body?.classList.add('dark-mode');
    // removing data from session storage

    localStorage.removeItem('Slicalight-primary-color');
    localStorage.removeItem('Slicalight-primary-hover');
    localStorage.removeItem('Slicalight-primary-border');
    localStorage.removeItem('Slicatransparent-primary-color');
    localStorage.removeItem('Slicatransparent-primary-hover');
    localStorage.removeItem('Slicatransparent-primary-border');
    localStorage.removeItem('SlicaTransparentTheme')

    // Removing
    this.body?.classList.remove('light-mode');
    // this.body?.classList.remove('light-mode');
    this.body?.classList.remove("transparent-mode")
    localStorage.removeItem('Slicatransparent-bg-color')
    // switcher.checkOptions();
    switcher.checkOptions();
    switcher.updateChanges();
  }

  public dynamicLightPrimary(data: any): void {
    this.color1 = data.color;

    const dynamicPrimaryLight = document.querySelectorAll('input.color-primary-light');

    switcher.dynamicLightPrimaryColor(dynamicPrimaryLight, this.color1);

    localStorage.setItem('Slicalight-primary-color', this.color1);
    localStorage.setItem('Slicalight-primary-hover', this.color1);
    localStorage.setItem('Slicalight-primary-border', this.color1);
    let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;
    localStorage.setItem('Slicalight-theme', 'true')

    // Adding
    this.body?.classList.add('light-mode');

    // Removing
    this.body?.classList.remove('dark-mode');
    this.body?.classList.remove('bg-img1');
    this.body?.classList.remove('bg-img2');
    this.body?.classList.remove('bg-img3');
    this.body?.classList.remove('bg-img4');
    // removing data from session storage
    localStorage.removeItem('Slicadark-primary-color');
    localStorage.removeItem('Slicadark-primary-hover');
    localStorage.removeItem('Slicadark-primary-border');
    localStorage.removeItem('Slicadark-body');
    localStorage.removeItem('SlicaBgImage');
    switcher.checkOptions();
    switcher.updateChanges();
  }

  public dynamicTranparentPrimary(data: any): void {
    this.color3 = data.color;

    const dynamicPrimaryTrasnsparent = document.querySelectorAll('input.color-primary-transparent');

    // switcher.dynamicTrasnsparentPrimaryColor(
    //   dynamicPrimaryTrasnsparent,
    //   this.color3
    // );
    localStorage.setItem('Slicatransparent-primary-color', this.color3);
    localStorage.setItem('Slicatransparent-primary-hover', this.color2);
    localStorage.setItem('Slicatransparent-primary-border', this.color2);
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
    transparent.checked = true;

    // Adding
    this.body?.classList.add('transparent-mode');
    localStorage.setItem('SlicaTransparentTheme', 'true');

    // Removing
    this.body?.classList.remove("dark-mode")
    this.body?.classList.remove('light-mode');
    localStorage.removeItem('SlicaDarkTheme');
    localStorage.removeItem('SlicaLightTheme');
    this.body?.classList.remove('light-mode');
    this.body?.classList.remove('dark-mode');
    this.body?.classList.remove('bg-img1');
    this.body?.classList.remove('bg-img2');
    this.body?.classList.remove('bg-img3');
    this.body?.classList.remove('bg-img4');
    this.body?.classList.remove('light-header');
    this.body?.classList.remove('dark-header');
    this.body?.classList.remove('color-header');
    this.body?.classList.remove('gradient-header');
    this.body?.classList.remove('light-menu');
    this.body?.classList.remove('color-menu');
    this.body?.classList.remove('dark-menu');
    this.body?.classList.remove('gradient-menu');
    document.querySelector('.app-header')?.classList.add("hor-header", "fixed-header", "visible-title", "stickyClass")

    localStorage.removeItem('Slicalight-primary-color');
    localStorage.removeItem('Slicalight-primary-hover');
    localStorage.removeItem('Slicalight-primary-border');
    localStorage.removeItem('Slicadark-primary-color');
    localStorage.removeItem('Slicadark-primary-hover');
    localStorage.removeItem('Slicadark-primary-border');
    localStorage.removeItem('Slicadark-body');
    localStorage.removeItem('SlicaBgImage');
    switcher.removeForTransparent();
    switcher.updateChanges();
  }


 LightTheme(){
    // localStorage.clear()

    // Adding
    this.body?.classList.add('light-mode');

    // Removing
    localStorage.setItem("SlicaLightTheme","true")
    this.body?.classList.remove("transparent-mode")
    this.body?.classList.remove("dark-mode")
    localStorage.removeItem("SlicaTransparentTheme")
    localStorage.removeItem("SlicaDarkTheme")
  }

  DarkTheme(){
    // localStorage.clear()

    //Adding
    localStorage.setItem("SlicaDarkTheme","true")
    this.body?.classList.add("dark-mode")

    // Removing
    this.body?.classList.remove("transparent-mode")
    this.body?.classList.remove("light-mode")
    localStorage.removeItem("SlicaTransparentTheme")
    localStorage.removeItem("SlicaLightTheme")
  }


  public dynamicDarkBg(data: any): void {
    this.color3 = data.color;


    const dynamicBodyDark = document.querySelectorAll('input.dark-bg-body');

    switcher.dynamicDarkBodyColor(dynamicBodyDark, this.color3);

    localStorage.setItem('Slicadark-body', this.color3);
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;
    localStorage.setItem('Slicadark-theme', 'true')
    localStorage.removeItem('Slicalight-theme')

    // Adding
    this.body?.classList.add('dark-mode');

    // Removing
    this.body?.classList.remove('light-mode');

    this.body?.classList.remove('light-mode');
    let allImg = document.querySelectorAll('.bg-img');
    allImg.forEach((el, i) => {
      let ele = el.classList[0];
      this.body?.classList.remove(ele);
    });


    // removing data from session storage
    localStorage.removeItem('Slicalight-primary-color');
    localStorage.removeItem('Slicalight-primary-hover');
    localStorage.removeItem('Slicalight-primary-border');
    localStorage.removeItem('SlicaBgImage');

    switcher.checkOptions();
    switcher.updateChanges();
  }

}
