import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

// Menu
export interface Menu {
  headTitle?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeValue?: string;
  badgeClass?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  Menusub?: boolean;
  target?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    {
      headTitle: 'MAIN',
    },
    {
      title: 'Dashboard',
      icon: 'home',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        { path: '/dashboard/sales', title: 'Sales', type: 'link' },
        { path: '/dashboard/ecommerce', title: 'Ecommerce', type: 'link' },
        { path: '/dashboard/crypto', title: 'Crypto', type: 'link' },
        { path: '/dashboard/analytics', title: 'Analytics', type: 'link' },
        { path: '/dashboard/crm', title: 'CRM', type: 'link' },
      ],
    },
    {
      headTitle: 'ADMINISTRATIVE',
    },

    {
      title: 'Configurations',
      icon: 'settings',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        // {
        //   title: 'Users',
        //   icon: 'user',
        //   type: 'sub',
        //   Menusub: true,
        //   active: false,
        //   children: [
        //     { path: '/maps/leafletmaps', title: 'Leaflet Maps', type: 'link' },
        //   ],
        // },
        { path: '/configurations/users', title: 'Users', type: 'link' },
      ],
    },

    {
      title: 'Advanced Ui',
      icon: 'shield',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        { path: '/advancedui/accordion', title: 'Accordion', type: 'link' },
        { path: '/advancedui/tabs', title: 'Tabs', type: 'link' },
        { path: '/advancedui/charts', title: 'Charts', type: 'link' },
        {
          path: '/advancedui/sweetalerts',
          title: 'Sweet Alerts',
          type: 'link',
        },
        {
          path: '/advancedui/rangeslider',
          title: 'Range Slider',
          type: 'link',
        },
        {
          path: '/advancedui/contentscrollbar',
          title: 'Content Scroll Bar',
          type: 'link',
        },
        { path: '/advancedui/modal', title: 'Modal', type: 'link' },
        {
          path: '/advancedui/tooltipandpopover',
          title: 'Tooltip & Popover',
          type: 'link',
        },
        { path: '/advancedui/progress', title: 'Progress', type: 'link' },
        { path: '/advancedui/carousels', title: 'Carousels', type: 'link' },
        { path: '/advancedui/loaders', title: 'Loaders', type: 'link' },
        { path: '/advancedui/counters', title: 'Counters', type: 'link' },
        { path: '/advancedui/ratings', title: 'Ratings', type: 'link' },
      ],
    },

    {
      headTitle: 'GENERAL',
    },

    {
      title: 'Icons',
      icon: 'activity',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        { path: '/icons/fontawesome', title: 'Font Awsome', type: 'link' },
        {
          path: '/icons/simplelineicons',
          title: 'Simple Line Icons',
          type: 'link',
        },
        { path: '/icons/themifyicons', title: 'Themify Icons', type: 'link' },
        { path: '/icons/flagicons', title: 'Flag Icons', type: 'link' },
        { path: '/icons/feathericons', title: 'Feather Icons', type: 'link' },
        { path: '/icons/ionicicons', title: 'Ionic Icons', type: 'link' },
        { path: '/icons/pe7', title: 'Pe7 Icons', type: 'link' },
        { path: '/icons/typicons', title: 'Typicons', type: 'link' },
        {
          path: '/icons/materialdesign',
          title: 'Material Design Icons',
          type: 'link',
        },
        { path: '/icons/weathericon', title: 'Weather Icons', type: 'link' },
      ],
    },

    {
      title: 'Form',
      icon: 'file',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        { path: '/form/formelements', title: 'Form Elements', type: 'link' },
        { path: '/form/formeditor', title: 'Form Editor', type: 'link' },
        {
          path: '/form/formelementsizes',
          title: 'Form Elements Sizes',
          type: 'link',
        },
        { path: '/form/formtreeview', title: 'Form Treeview', type: 'link' },
        { path: '/form/formwizards', title: 'Form Wizards', type: 'link' },
      ],
    },
    {
      title: 'Charts',
      icon: 'bar-chart',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        { path: '/charts/chartjs', title: 'Chart Js', type: 'link' },
        { path: '/charts/apexcharts', title: 'Apexcharts', type: 'link' },
        { path: '/charts/echarts', title: 'Echarts', type: 'link' },
      ],
    },

    {
      headTitle: 'PAGES',
    },

    {
      title: 'Pages',
      icon: 'layers',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        { path: '/pages/profile', title: 'Profile', type: 'link' },
        { path: '/pages/editprofile', title: 'Edit Profile', type: 'link' },
        { path: '/pages/mailcompose', title: 'Mail Compose', type: 'link' },
        { path: '/pages/mailinbox', title: 'Mail Inbox', type: 'link' },
        { path: '/pages/empty', title: 'Empty', type: 'link' },
        { path: '/pages/gallery', title: 'Gallery', type: 'link' },
        { path: '/pages/about', title: 'About', type: 'link' },
        { path: '/pages/services', title: 'Services', type: 'link' },
        { path: '/pages/faqs', title: 'FAQS', type: 'link' },
        { path: '/pages/terms', title: 'Terms', type: 'link' },
        { path: '/pages/invoice', title: 'Invoice', type: 'link' },
        { path: '/pages/pricingtables', title: 'Pricing Tables', type: 'link' },

        {
          path: '/switcher-one-route',
          title: 'Switcher',
          type: 'link',
        },
      ],
    },
    {
      title: 'ECommerce',
      icon: 'shopping-bag',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        { path: '/ecommerce/shop', title: 'Shop', type: 'link' },
        {
          path: '/ecommerce/productdetails/1',
          title: 'Product Details',
          type: 'link',
        },
        {
          path: '/ecommerce/shoppingcart',
          title: 'Shopping Cart',
          type: 'link',
        },
        { path: '/ecommerce/checkout', title: 'Checkout', type: 'link' },
        { path: '/ecommerce/wishlist', title: 'Wishlist', type: 'link' },
      ],
    },
    {
      title: 'Custom Pages',
      icon: 'shopping-bag',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        { path: '/custompages/login', title: 'Login', type: 'link' },
        { path: '/custompages/register', title: 'Register', type: 'link' },
        {
          path: '/custompages/forgotpassword',
          title: 'Forget Password',
          type: 'link',
        },
        { path: '/custompages/lockscreen', title: 'Lock Screen', type: 'link' },
        {
          path: '/custompages/underconstruction',
          title: 'Under Construction',
          type: 'link',
        },
        { path: '/custompages/error400', title: ' 400', type: 'link' },
        { path: '/custompages/error401', title: ' 401', type: 'link' },
        { path: '/custompages/error403', title: ' 403', type: 'link' },
        { path: '/custompages/error404', title: ' 404', type: 'link' },
        { path: '/custompages/error500', title: ' 500', type: 'link' },
        { path: '/custompages/error503', title: '503', type: 'link' },
      ],
    },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
