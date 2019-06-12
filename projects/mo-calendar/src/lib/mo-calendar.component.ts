import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'm-calendar',
  template: `
  <div class="wrapper">
    <div class="container-calendar">
        <h3 id="monthAndYear"></h3>
        <div class="button-container-calendar">
            <button id="previous" (click)="previous()">&#8249;</button>
            <button id="next" (click)="next()">&#8250;</button>
        </div>
         <table class="table-calendar" id="calendar" >
            <thead id="thead-month"></thead>
            <tbody id="calendar-body"></tbody>
        </table>
    </div>
</div>
  `,
  styleUrls: ['./m-calendar.component.css']
})
export class MCalendarComponent implements OnInit {

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

    var dataHead = "<tr>";
    for (var dhead in this.days) {
      dataHead += "<th data-days='" + this.days[dhead] + "' class='txtmes'>" + this.days[dhead] + "</th>";
    }
    dataHead += "</tr>";

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
    for (var i = 0; i < 6; i++) {
      var row = document.createElement("tr");
      for (var j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          var cell = document.createElement("td");
          var cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
          cell.setAttribute("style", `padding: 5px;border: 1px solid #e2e2e2 !important;text-align: center;vertical-align: top;background: #42424242!important;`);
        } else if (date > this.daysInMonth(mes, anio)) {
          break;
        } else {
          cell = document.createElement("td");
          cell.setAttribute("id", `date${date}${mes + 1}${anio}`);
          if (j == 0) {
            cell.setAttribute("style", `padding: 5px;border: 1px solid #e2e2e2 !important;text-align: center;vertical-align: top;color: red !important;`);
          } else {
            cell.setAttribute("style", `padding: 5px;border: 1px solid #e2e2e2 !important;text-align: center;vertical-align: top;`);
          }
          cell.innerHTML = "<span >" + date + "</span>";
          if (date === this.today.getDate() && anio === this.today.getFullYear() && mes === this.today.getMonth()) {
            cell.setAttribute('style', 'font-weight: bold;    background: #00BCD4;color:#FFF;');
          }
          row.appendChild(cell);
          date++;
        }
      }
      tbl.appendChild(row);
    }

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
