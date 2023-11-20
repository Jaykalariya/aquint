export let colorsHTML1 =
`    <div class="card-body">
<div class="text-wrap">
    <div class="example">
        <div class="row">
            <div class="col-md-6 col-lg-4 col-sm-6">
                <div class="d-flex align-items-center mb-3 mt-3">
                    <div class="w-7 h-7 bg-primary  me-4"></div>
                    <div>
                        <strong>Primary</strong><br>
                        <code>.bg-primary</code>
                    </div>
                </div>
            </div><!-- COL END -->
            <div class="col-md-6 col-lg-4 col-sm-6">
                <div class="d-flex align-items-center mb-3 mt-3">
                    <div class="w-7 h-7 bg-info  me-4"></div>
                    <div>
                        <strong>Info</strong><br>
                        <code>.bg-info</code>
                    </div>
                </div>
            </div><!-- COL END -->
            <div class="col-md-6 col-lg-4 col-sm-6">
                <div class="d-flex align-items-center mb-3 mt-3">
                    <div class="w-7 h-7 bg-secondary  me-4"></div>
                    <div>
                        <strong>Secondary</strong><br>
                        <code>.bg-secondary</code>
                    </div>
                </div>
            </div><!-- COL END -->
            <div class="col-md-6 col-lg-4 col-sm-6">
                <div class="d-flex align-items-center mb-3 mt-3">
                    <div class="w-7 h-7 bg-warning  me-4"></div>
                    <div>
                        <strong>Warning</strong><br>
                        <code>.bg-warning</code>
                    </div>
                </div>
            </div><!-- COL END -->
            <div class="col-md-6 col-lg-4 col-sm-6">
                <div class="d-flex align-items-center mb-3 mt-3">
                    <div class="w-7 h-7 bg-danger  me-4"></div>
                    <div>
                        <strong>Danger</strong><br>
                        <code>.bg-danger</code>
                    </div>
                </div>
            </div><!-- COL END -->
            <div class="col-md-6 col-lg-4 col-sm-6">
                <div class="d-flex align-items-center mb-3 mt-3">
                    <div class="w-7 h-7 bg-success  me-4"></div>
                    <div>
                        <strong>Success</strong><br>
                        <code>.bg-success</code>
                    </div>
                </div>
            </div><!-- COL END -->
        </div>
    </div>
    <div #collapse="ngbCollapse" [(ngbCollapse)]="isCollapsed">
      <div class="panel panel-primary tabs-style-1 my-3">
        <ul ngbNav #nav1="ngbNav" class="panel-tabs">
          <li class="me-2 mb-1" [ngbNavItem]="1">
            <a ngbNavLink>HTML</a>
            <ng-template ngbNavContent>
              <pre><code >{{html1}}</code></pre>

            </ng-template>
          </li>
          <li class="me-2 mb-1" [ngbNavItem]="2">
            <a ngbNavLink>TS</a>
            <ng-template ngbNavContent>
              <pre><code >{{ts1}}</code></pre>

            </ng-template>
          </li>
        </ul>

        <div class="panel-body tabs-menu-body main-content-body-right border-top-0 border">
          <div [ngbNavOutlet]="nav1" class="tab-pane"></div>
          <div class="tab-content"></div>
        </div>
      </div>
    </div>
</div>
</div>`

export let colorsTS1 =
`import { Component, OnInit } from '@angular/core';
import * as codeData from '../../../shared/prismData/colors';
@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public isCollapsed = true;
  html1: string = codeData.colorsHTML1;
  ts1: string = codeData.colorsTS1;
}
`
export let colorsHTML2 =
`   <div class="row">
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-primary-gradient  me-4"></div>
        <div>
            <strong>Primary</strong><br>
            <code>.bg-primary-gradient</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-info-gradient  me-4"></div>
        <div>
            <strong>Info</strong><br>
            <code>.bg-info-gradient</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-secondary-gradient  me-4"></div>
        <div>
            <strong>Secondary</strong><br>
            <code>.bg-secondary-gradient</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-warning-gradient  me-4"></div>
        <div>
            <strong>Warning</strong><br>
            <code>.bg-warning-gradient</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-danger-gradient  me-4"></div>
        <div>
            <strong>Danger</strong><br>
            <code>.bg-danger-gradient</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-success-gradient  me-4"></div>
        <div>
            <strong>Success</strong><br>
            <code>.bg-success-gradient</code>
        </div>
    </div>
</div><!-- COL END -->
</div>`

export let colorsTS2 =
`import { Component, OnInit } from '@angular/core';
import * as codeData from '../../../shared/prismData/colors';
@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public isCollapsed = true;
  public isCollapsed2 = true;
  html1: string = codeData.colorsHTML1;
  ts1: string = codeData.colorsTS1;
  html2: string = codeData.colorsHTML2;
  ts2: string = codeData.colorsTS2;
`

export let colorsHTML3 =
` <div class="row">
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-blue  me-4"></div>
        <div>
            <strong>Blue</strong><br>
            <code>.bg-blue</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-red  me-4"></div>
        <div>
            <strong>Red</strong><br>
            <code>.bg-red</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-teal  me-4"></div>
        <div>
            <strong>Teal</strong><br>
            <code>.bg-teal</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-azure   me-4"></div>
        <div>
            <strong>Azure</strong><br>
            <code>.bg-azure </code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-orange  me-4"></div>
        <div>
            <strong>Orange</strong><br>
            <code>.bg-orange</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-cyan  me-4"></div>
        <div>
            <strong>Cyan</strong><br>
            <code>.bg-cyan</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-indigo  me-4"></div>
        <div>
            <strong>Indigo</strong><br>
            <code>.bg-indigo</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-yellow  me-4"></div>
        <div>
            <strong>Yellow</strong><br>
            <code>.bg-yellow</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-gray  me-4"></div>
        <div>
            <strong>Gray</strong><br>
            <code>.bg-gray</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-purple   me-4"></div>
        <div>
            <strong>Purple</strong><br>
            <code>.bg-purple </code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-lime  me-4"></div>
        <div>
            <strong>Lime</strong><br>
            <code>.bg-lime</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-gray-dark  me-4"></div>
        <div>
            <strong>Dark Gray</strong><br>
            <code>.bg-gray-dark</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-pink   me-4"></div>
        <div>
            <strong>Pink</strong><br>
            <code>.bg-pink </code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-green  me-4"></div>
        <div>
            <strong>Green</strong><br>
            <code>.bg-green</code>
        </div>
    </div>
</div><!-- COL END -->
<div class="col-md-6 col-lg-4 col-sm-6">
    <div class="d-flex align-items-center mb-3 mt-3">
        <div class="w-7 h-7 bg-secondary  me-4"></div>
        <div>
            <strong>secondary</strong><br>
            <code>.bg-secondary</code>
        </div>
    </div>
</div><!-- COL END -->
</div>`

export let colorsTS3 =
`import { Component, OnInit } from '@angular/core';
import * as codeData from '../../../shared/prismData/colors';
@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public isCollapsed = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  html1: string = codeData.colorsHTML1;
  ts1: string = codeData.colorsTS1;
  html2: string = codeData.colorsHTML2;
  ts2: string = codeData.colorsTS2;
  html3: string = codeData.colorsHTML3;
  ts3: string = codeData.colorsTS3;
}

`
