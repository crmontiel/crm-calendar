import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'MPricing',
  template: `
  <div id="wrapper">
    <div id="pricing-tables" >
      <div class="pricing-table" *ngFor="let i of data;let p =index" [ngClass]="{'featured': i.pro}">
        <div class="header">
          <div class="title">{{i.title}}</div>
          <div class="price">{{i.price}}<span>/{{i.time}}</span></div>
        </div>
        <div class="features">
          <ul>
            <li *ngFor="let l of data[p].values">{{l.value}} <span>{{l.description}}</span></li>
          </ul>
        </div>
        <div class="signup">
          <div (click)="boton(i.title)">{{i.button}}</div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    #wrapper {
      width: 100%;
    }

    @media screen and (min-width: 1024px) {
      #wrapper {
        width: 1100px;
        margin: 0 auto;
      }
    }

    #wrapper #pricing-tables {
      font-family: "Abel", sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    @media screen and (min-width: 1024px) {
      #wrapper #pricing-tables {
        flex-direction: row;
      }
    }

    #wrapper #pricing-tables .pricing-table {
      max-width: 280px;
      width: 100%;
      margin: 15px 0;
    }

    @media screen and (min-width: 1024px) {
      #wrapper #pricing-tables .pricing-table {
        margin: 0;
      }
    }

    #wrapper #pricing-tables .pricing-table .header .title {
      text-align: center;
      text-transform: uppercase;
      padding: 15px 0;
      background: #e4e4e4;
      color: #000;
      font-size: 16x;
    }

    #wrapper #pricing-tables .pricing-table .header .price {
      text-align: center;
      text-transform: uppercase;
      padding: 15px 0;
      background: #f6f6f6;
      color: #000;
      font-size: 28px;
      font-weight: 300;
    }

    #wrapper #pricing-tables .pricing-table .header .price span {
      font-size: 14px;
      vertical-align: super;
    }

    #wrapper #pricing-tables .pricing-table .features {
      background: #fff;
    }

    #wrapper #pricing-tables .pricing-table .features ul {
      list-style: none;
      margin: 0;
      padding: 15px 0;
    }

    #wrapper #pricing-tables .pricing-table .features ul li {
      padding: 8px 5px;
      text-align: center;
    }

    #wrapper #pricing-tables .pricing-table .features ul li span {
      color: #999;
    }

    #wrapper #pricing-tables .pricing-table .signup {
      background: #fff;
      padding: 2px 0 25px 0;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    #wrapper #pricing-tables .pricing-table .signup  div{
      width: auto;
      margin: 0 auto;
      padding: 8px 10px;
      text-align: center;
      text-decoration: none;
      color: #FC4445;
      border: 1px solid #FC4445;
      transition: all .2s ease;
    }

    #wrapper #pricing-tables .pricing-table .signup div:hover {
      color: #fff;
      background: #FC4445;
      cursor:pointer;
    }

    #wrapper #pricing-tables .pricing-table.featured .header .title {
      background: #FC4445;
      color: #fff;
    }

    #wrapper #pricing-tables .pricing-table.featured .signup div {
      background: #FC4445;
      color: #fff;
    }

    #wrapper #pricing-tables .pricing-table.featured .signup div:hover {
      color: #FC4445;
      background: #fff;
      cursor:pointer;
    }
`]
})
export class MPricingComponent implements OnInit {
  @Input() valor: any;
  @Output() selected: EventEmitter<number> = new EventEmitter<any>();

  data = []
  constructor() {

  }

  ngOnInit() {
    this.data = this.valor
    // this.log()

  }
  // log() {
  //
  // }

  boton(item) {
    this.selected.emit(item);
  }

}
