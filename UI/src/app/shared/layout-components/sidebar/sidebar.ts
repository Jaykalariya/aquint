


import { fromEvent } from 'rxjs';

export function switcherArrowFn() {
  // used to remove show class and remove class on clicking arrow buttons
  function slideClick() {
    let slide = document.querySelectorAll<HTMLElement>('.slide');
    let slideMenu = document.querySelectorAll<HTMLElement>('.slide-menu');
    slide.forEach((element, index) => {
      if (element.classList.contains('is-expanded') == true) {
        element.classList.remove('is-expanded');
      }
    });
    slideMenu.forEach((element, index) => {
      if (element.classList.contains('open') == true) {
        element.classList.remove('open');
        element.style.display = 'none';
      }
    });
  }


  checkHoriMenu();

  let slideLeft: HTMLElement | any = document.querySelector('.slide-left');
  let slideRight: HTMLElement | any = document.querySelector('.slide-right');

  fromEvent(slideLeft, 'click').subscribe(() => {


    let menuWidth: any =
      document.querySelector<HTMLElement>('.horizontal-main');
    let menuItems: any = document.querySelector<HTMLElement>('.side-menu');
    let mainSidemenuWidth: any =
      document.querySelector<HTMLElement>('.main-sidemenu');

    let menuContainerWidth =
      menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    let marginLeftValue =
      Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0])
      );
      let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginRight.split('px')[0]));
    // if (marginLeftValue < 0) {
    //   // menuItems.style.marginRight = 0;
    //   menuItems.style.marginLeft =
    //     Number(menuItems.style.marginLeft.split('px')[0]) + 100 + 'px';
    //   if (menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth) {
    //     document.querySelector('.slide-left')?.classList.remove('d-none');
    //     document.querySelector('.slide-right')?.classList.remove('d-none');
    //   }
    // } else {
    //   document.querySelector('.slide-left')?.classList.add('d-none');
    // }

    // if (marginLeftValue >= 0) {
    //   // menuItems.style.marginRight = 0;
    //   menuItems.style.marginLeft = '0px';
    //   if (menuWidth?.offsetWidth < menuItems.scrollWidth) {
    //     document.querySelector('.slide-left')?.classList.add('d-none');
    //   }
    // }
    if (menuItems.scrollWidth > mainSidemenuWidth.offsetWidth) {
      if (!document.body.classList.contains('rtl')) {
        if ( marginLeftValue < 0 && !(Math.abs(marginLeftValue) < menuContainerWidth)) {
          menuItems.style.marginRight = 0;
          menuItems.style.marginLeft = Number(menuItems.style.marginLeft.split('px')[0]) + Math.abs(menuContainerWidth) + 'px';
          slideRight.classList.remove('d-none');
        } else if (marginLeftValue >= 0) {
          menuItems.style.marginLeft = '0px';
          slideLeft.classList.add('d-none');
          slideRight.classList.remove('d-none');
        } else {
          menuItems.style.marginLeft = '0px';
          slideLeft.classList.add('d-none');
          slideRight.classList.remove('d-none');
        }
      } else {
        if ( marginRightValue < 0 && !(Math.abs(marginRightValue) < menuContainerWidth)) {
          menuItems.style.marginLeft = 0;
          menuItems.style.marginRight = Number(menuItems.style.marginRight.split('px')[0]) + Math.abs(menuContainerWidth) + 'px';
          slideRight.classList.remove('d-none');
        } else if (marginRightValue >= 0) {
          menuItems.style.marginRight = '0px';
          slideLeft.classList.add('d-none');
          slideRight.classList.remove('d-none');
        } else {
          menuItems.style.marginRight = '0px';
          slideLeft.classList.add('d-none');
          slideRight.classList.remove('d-none');
        }
      }
    }

    // to remove dropdown when clicking arrows in horizontal menu
    let subNavSub = document.querySelectorAll<HTMLElement>('.sub-nav-sub');
    subNavSub.forEach((e) => {
      e.style.display = '';
    });
    let subNav = document.querySelectorAll<HTMLElement>('.nav-sub');
    subNav.forEach((e) => {
      e.style.display = '';
    });

    slideClick();
    return;
    //
  });
  fromEvent(slideRight, 'click').subscribe(() => {
    let menuWidth: any =
      document.querySelector<HTMLElement>('.horizontal-main');
    let menuItems: any = document.querySelector<HTMLElement>('.side-menu');
    let mainSidemenuWidth: any =
      document.querySelector<HTMLElement>('.main-sidemenu');
    let menuContainerWidth =
      menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    let marginLeftValue =
      Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0])
      );
    let check =
      menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;
      let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginRight.split('px')[0]));

    // if (marginLeftValue > -check) {
    //   // menuItems.style.marginRight = 0;
    //   menuItems.style.marginLeft =
    //     Number(menuItems.style.marginLeft.split('px')[0]) - 100 + 'px';
    // } else {
    //   // menuItems.style.marginRight = 0;
    //   menuItems.style.marginLeft = -check + 'px';
    //   document.querySelector('.slide-right')?.classList.add('d-none');
    // }
    // if (marginLeftValue != 0) {
    //   document.querySelector('.slide-left')?.classList.remove('d-none');
    // }
    if (menuItems.scrollWidth > mainSidemenuWidth.offsetWidth) {
      if (!document.body.classList.contains('rtl')) {
        if (Math.abs(check) > Math.abs(marginLeftValue)) {
          menuItems.style.marginRight = 0;
          if (!(Math.abs(check) > Math.abs(marginLeftValue) + menuContainerWidth)) {
            menuContainerWidth = Math.abs(check) - Math.abs(marginLeftValue);
            slideRight.classList.add('d-none');
          }
          menuItems.style.marginLeft = Number(menuItems.style.marginLeft.split('px')[0]) - Math.abs(menuContainerWidth) + 'px';
          slideLeft.classList.remove('d-none');
        }
      } else {
        if (Math.abs(check) > Math.abs(marginRightValue)) {
          menuItems.style.marginLeft = 0;
          if (!(Math.abs(check) > Math.abs(marginRightValue) + menuContainerWidth)) {
            mainSidemenuWidth = Math.abs(check) - Math.abs(marginRightValue);
            slideRight.classList.add('d-none');
          }
          menuItems.style.marginRight = Number(menuItems.style.marginRight.split('px')[0]) - Math.abs(menuContainerWidth) + 'px';
          slideLeft.classList.remove('d-none');
        }
      }
    }

    // to remove dropdown when clicking arrows in horizontal menu
    let subNavSub = document.querySelectorAll<HTMLElement>('.sub-nav-sub');
    subNavSub.forEach((e) => {
      e.style.display = '';
    });
    let subNav = document.querySelectorAll<HTMLElement>('.nav-sub');
    subNav.forEach((e) => {
      e.style.display = '';
    });



    slideClick();
    return;
    //
  });

}
export function checkHoriMenu() {
  let menuWidth: any = document.querySelector<HTMLElement>('.horizontal-main');
  let menuItems: any = document.querySelector<HTMLElement>('.side-menu');
  let mainSidemenuWidth: any =
    document.querySelector<HTMLElement>('.main-sidemenu');

  let menuContainerWidth =
    menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
  let slideLeft: HTMLElement | any = document.querySelector('.slide-left');
  let slideRight: HTMLElement | any = document.querySelector('.slide-right');
  let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0]));
  let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginRight.split('px')[0]));
  let check =
    menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;

  setTimeout(()=>{

      // Show/Hide the arrows
    // if (menuItems.scrollWidth > menuWidth.offsetWidth) {
    //   slideRight.classList.remove('d-none');
    //   slideLeft.classList.add('d-none');
    // }
    // else{
    //   slideRight.classList.add('d-none');
    //   slideLeft.classList.add('d-none');
    //   menuItems.style.marginLeft = '0px';
    //   menuItems.style.marginRight = '0px';
    // }
    // if(marginLeftValue == 0 || marginRightValue == 0){
    //   slideLeft.classList.add('d-none');
    // }
    // else{
    //   slideLeft.classList.remove('d-none');
    // }

    if(!document.body.classList.contains('rtl')){
      // LTR check the width and adjust the menu in screen
      if (menuItems.scrollWidth > mainSidemenuWidth.offsetWidth){
        if(Math.abs(check) < Math.abs(marginLeftValue)){
          menuItems.style.marginLeft = -check +100+ 'px';
          slideLeft.classList.remove('d-none');
          slideRight.classList.add('d-none');
        }
      }
    }
    else{
      // RTL check the width and adjust the menu in screen
      if (menuItems.scrollWidth > mainSidemenuWidth.offsetWidth){
        if(Math.abs(check) < Math.abs(marginRightValue)){
          menuItems.style.marginRight = -check +100+ 'px';
          slideLeft.classList.remove('d-none');
          slideRight.classList.add('d-none');
        }
      }
    }
    if(marginLeftValue != 0 || marginRightValue !=0 ){
      slideLeft.classList.remove('d-none');
    }
  })

}

export function parentNavActive() {
  let slideItemActive = document.querySelector(
    '.slide-item.active:not([href="/"])'
  );
  let SubslideItemActive = document.querySelector(
    '.sub-slide-item.active:not([href="/"])'
  );
  if (slideItemActive) {
    slideItemActive.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
  }
  if (SubslideItemActive) {
    SubslideItemActive.parentElement?.classList.add('active');
    SubslideItemActive.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
    SubslideItemActive.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
  }
}
