import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'crm-calendar',
  template: `
  <div class="wrapper">
        <h3 id="monthAndYear"></h3>
        <div class="button-container-calendar">
            <button id="previous" (click)="previous()">&#8249;</button>
            <button id="next" (click)="next()">&#8250;</button>
        </div>
         <div class="table-calendar" id="calendar" >
            <div class="lmeses" id="thead-month"></div>
            <div id="calendar-body" style='width: 100%;'></div>
        </div>
</div>
  `,
  styleUrls: ['./crm-calendar.component.css']
})
export class CrmCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.generaCalendario()
  }

  today = new Date()
  yearnow = this.today.getFullYear();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  selectYear = this.yearnow;
  selectMonth = this.today.getMonth();
  monthAndYear
  months;
  days;
  @Input() lang
  generaCalendario() {
    var calendar = document.getElementById("calendar");
    var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    if (this.lang == "en") {
      this.months = monthDefault;
      this.days = dayDefault;
    }
    // else if (lang == "id") {
    //   this.months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    //   this.days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    // }
    else if (this.lang == "fr") {
      this.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      this.days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    } else if (this.lang == "es") {
      this.months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
      this.days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    } else {
      this.months = monthDefault;
      this.days = dayDefault;
    }

    var dataHead = "";
    for (var dhead in this.days) {
      dataHead = dataHead + "<span style='width: 14.28% !important;height: 35px;float: left !important;text-align: center !important;background: #424242 !important;color: #FFF !important;' >" + this.days[dhead] + "</span>";
    }
    // dataHead += "</div>";

    document.getElementById("thead-month").innerHTML = dataHead;


    this.mostrarCalendario(this.currentMonth, this.currentYear);
  }



  mostrarCalendario(mes, anio) {
    var firstDay = (new Date(anio, mes)).getDay();

    var tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    this.monthAndYear = document.getElementById("monthAndYear");
    this.monthAndYear.innerHTML = this.months[mes] + " " + anio;
    this.selectYear = anio;
    this.selectMonth = mes;

    var date = 1;
    var rowDays = 0
    var row = ''
    for (var i = 0; i < 6; i++) {
      // row = ''
      row = row + "<div style='width: 100%!important;height: 100px;'>"
      // cell.setAttribute("style", 'width:100%!important;');
      for (var j = 0; j < 7; j++) {

        if (i === 0 && j < firstDay) {
          row = row + "<div class='boxfecha dantes'></div>"
          // var cell = document.createElement("div");
        } else if (date > this.daysInMonth(mes, anio)) {
          break;
        } else {
          row = row + `<div class="boxfecha dmes" id="date${this.yearnow}${this.yearnow}${date}"><span class="txtdia">${date}</span><div class="boxcita" id="citas${this.yearnow}${this.yearnow}${date}"></div></div>`
          // cell = document.createElement('div');
          // cell.innerHTML = "<span  class='date'>" + date + "</span>";
          // if (date === this.today.getDate() && anio === this.today.getFullYear() && mes === this.today.getMonth()) {
          //   cell.setAttribute('style', 'font-weight: bold;    background: #00BCD4;color:#FFF;');
          // }
          date++;
        }
        rowDays++;
      }//--Fin dias
      if (i == 5) {
        for (var id = 1; id <= 42 - rowDays; id++) {
          // row = row + "<div class='boxfecha dtantes'>" + id + "</div>"
          // row = row + "<div class='boxfecha dantes'><span class='txtdia'>" + id + "</span></div>"
        }
      }
      row = row + "</div>"
    }
    tbl.innerHTML = row;
  }

  daysInMonth(mes, anio) {
    return 32 - new Date(mes, anio, 32).getDate();
  }

  next() {
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.mostrarCalendario(this.currentMonth, this.currentYear);
  }

  previous() {
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    this.mostrarCalendario(this.currentMonth, this.currentYear);
  }


}
