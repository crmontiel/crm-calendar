import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';


@Component({
  selector: 'mimi-calendar',
  templateUrl: './mimi-calendar.component.html',
  styleUrls: ['./mimi-calendar.component.css']
})
export class MimiCalendarComponent implements OnInit {
  @Input() citas = [];
  diatexto = ""
  choy = new Date()
  cmes = this.choy.getMonth() + 1;
  cdia = this.choy.getDate();
  canio = this.choy.getFullYear();
  today = new Date()
  yearnow = this.today.getFullYear();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  selectYear = this.yearnow;
  selectMonth = this.today.getMonth();
  monthAndYear
  months;
  days;
  noex = true
  ArrayDays = [
    {
      dias: []
    }
  ]
  @Input() lang
  @Output() agrega: EventEmitter<any> = new EventEmitter<any>();
  @Output() vC: EventEmitter<any> = new EventEmitter<any>();
  @Output() vM: EventEmitter<any> = new EventEmitter<any>();
  vDay = 0

  constructor() { }

  async ngOnInit() {
    await this.generaCalendario()
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  generaCalendario() {
    var calendar = document.getElementById("calendar");
    var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (this.lang == "en") {
      this.months = monthDefault;
      this.days = dayDefault;
      this.diatexto = "Today"
    }

    else if (this.lang == "fr") {
      this.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      this.days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    } else if (this.lang == "es") {
      this.months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
      this.days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
      this.diatexto = "Hoy"
    } else {
      this.months = monthDefault;
      this.days = dayDefault;
    }

    var dataHead = "<tr>";
    for (var dhead in this.days) {
      dataHead += "<th data-days='" + this.days[dhead] + "' style='text-align:center!important;'>" + this.days[dhead] + "</th>";
    }
    dataHead += "</tr>";
    document.getElementById("thead-month").innerHTML = dataHead;
    this.mostrarCalendario(this.currentMonth, this.currentYear);
  }



  async mostrarCalendario(mes, anio) {
    var firstDay = (new Date(anio, mes)).getDay();

    this.monthAndYear = document.getElementById("monthAndYear");
    this.monthAndYear.innerHTML = this.months[mes] + " " + anio;
    this.selectYear = anio;
    this.selectMonth = mes;

    var date = 1;
    for (var i = 0; i < 6; i++) {

      var row = document.createElement("tr");
      if (this.vDay == 0) {
        this.ArrayDays.push(
          {
            dias: []
          }
        )
      }

      for (var j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          this.ArrayDays[i].dias.push({
            dia: 0
          })
        } else if (date > this.daysInMonth(mes, anio)) {
          break;
        } else {
          if (date === this.today.getDate() && anio === this.today.getFullYear() && mes === this.today.getMonth()) {
            this.ArrayDays[i].dias.push({
              dia: date,
              id: `${date}/${mes + 1}/${anio}`,
              hoy: true
            })
          } else {
            this.ArrayDays[i].dias.push({
              dia: date,
              id: `${date}/${mes + 1}/${anio}`,
              hoy: false
            })
          }
          date++;
        }
      }
    }
  }

  daysInMonth(mes, anio) {
    return 32 - new Date(mes, anio, 32).getDate();
  }

  async next() {
    this.ArrayDays = [{ dias: [] }]
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    await this.mostrarCalendario(this.currentMonth, this.currentYear);
    this.citas = await this.citas
  }

  async nowday() {
    this.today = new Date()
    this.yearnow = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.selectYear = this.yearnow;
    this.selectMonth = this.today.getMonth();
    this.ArrayDays = [{ dias: [] }]
    await this.generaCalendario()
    this.citas = await this.citas
  }


  async previous() {
    this.ArrayDays = [{ dias: [] }]
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    await this.mostrarCalendario(this.currentMonth, this.currentYear);
    this.citas = await this.citas
  }

  existe(fecha): boolean {
    let ex = true
    for (var i = 0; i < this.citas.length; i++) {
      if (this.citas[i].date == fecha) {
        ex = false
      }
    }
    return ex;
  }

  clickAgrega(date) {
    let hoy = this.cdia + "/" + this.cmes + "/" + this.canio;
    if (this.validaFecha(date, hoy) == true) {
      this.agrega.emit(date)
    }
  }
  verCita(fecha, id) {
    let v = { fecha: fecha, id: id }
    this.vC.emit(v)
  }
  verMas(fecha) {
    this.vM.emit(fecha)
  }

  validaFecha(n1, n2) {
    let re = false
    let f1 = n1.split('/')
    let f2 = n2.split('/')
    if (+f1[2] > +f2[2]) {
      re = true;
    } else if (+f1[2] == +f2[2]) {
      if (+f1[1] > +f2[1]) {
        re = true;
      } else if (+f1[1] == +f2[1]) {
        if (+f1[0] >= +f2[0]) {
          re = true;
        }
      }
    }
    return re;
  }



}
