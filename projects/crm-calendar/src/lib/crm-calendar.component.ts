import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'crm-calendar',
  templateUrl: './crm-calendar.component.html',
  styleUrls: ['./crm-calendar.component.css']
})
export class CrmCalendarComponent implements OnInit, OnChanges {
  @Input() citas;
  constructor() { }

  async ngOnInit() {
    await this.generaCalendario()
    await this.newCita(this.citas)
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes["citas"]) {
      console.log("NUEVAS")
    }
  }


  diatexto = ""
  today = new Date()
  yearnow = this.today.getFullYear();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  selectYear = this.yearnow;
  selectMonth = this.today.getMonth();
  monthAndYear
  months;
  days;
  ArrayDays = [
    {
      dias: []
    }
  ]
  @Input() lang
  vDay = 0


  generaCalendario() {
    var calendar = document.getElementById("calendar");
    var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    if (this.lang == "en") {
      this.months = monthDefault;
      this.days = dayDefault;
      this.diatexto = "Today"

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
      this.diatexto = "Hoy"
    } else {
      this.months = monthDefault;
      this.days = dayDefault;
    }

    // var dataHead = "";
    var dataHead = "<tr>";
    for (var dhead in this.days) {
      dataHead += "<th data-days='" + this.days[dhead] + "'>" + this.days[dhead] + "</th>";
      // dataHead = dataHead + "<span style='width: 14.28% !important;height: 35px;float: left !important;text-align: center !important;background: #424242 !important;color: #FFF !important;' >" + this.days[dhead] + "</span>";
    }
    dataHead += "</tr>";
    document.getElementById("thead-month").innerHTML = dataHead;
    // dataHead += "</div>";

    // document.getElementById("thead-month").innerHTML = dataHead;


    this.mostrarCalendario(this.currentMonth, this.currentYear);
  }



  async mostrarCalendario(mes, anio) {
    var firstDay = (new Date(anio, mes)).getDay();

    // var tbl = document.getElementById("calendar-body");
    // tbl.innerHTML = "";

    this.monthAndYear = document.getElementById("monthAndYear");
    this.monthAndYear.innerHTML = this.months[mes] + " " + anio;
    this.selectYear = anio;
    this.selectMonth = mes;

    // var date = 1;
    // var rowDays = 0
    // var row = ''
    // for (var i = 0; i < 6; i++) {
    //   // row = ''
    //   row = row + "<div class='bgc'>"
    //   // cell.setAttribute("style", 'width:100%!important;');
    //   for (var j = 0; j < 7; j++) {
    //
    //     if (i === 0 && j < firstDay) {
    //       row = row + "<div class='boxfecha dantes'></div>"
    //       // var cell = document.createElement("div");
    //     } else if (date > this.daysInMonth(mes, anio)) {
    //       break;
    //     } else {
    //       if (date === this.today.getDate() && anio === this.today.getFullYear() && mes === this.today.getMonth()) {
    //
    //         row = row + `<div class="boxfecha hoy" id="date${this.yearnow}${this.yearnow}${date}"><span class="txthoy">${date}</span><div class="boxcita" id="citas${this.yearnow}${this.yearnow}${date}"></div></div>`
    //
    //       } else {
    //
    //         row = row + `<div class="boxfecha dmes" id="date${this.yearnow}${this.yearnow}${date}"><span class="txtdia">${date}</span><div class="boxcita" id="citas${this.yearnow}${this.yearnow}${date}"></div></div>`
    //       }
    //         date++;
    //     }
    //     rowDays++;
    //   }//--Fin dias
    //   if (i == 5) {
    //     for (var id = 1; id <= 42 - rowDays; id++) {
    //       // row = row + "<div class='boxfecha dtantes'>" + id + "</div>"
    //       // row = row + "<div class='boxfecha dantes'><span class='txtdia'>" + id + "</span></div>"
    //     }
    //   }
    //   row = row + "</div>"
    // }
    // tbl.innerHTML = row;



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
          // this.ArrayDays.push({ day: 0 })
          this.ArrayDays[i].dias.push({
            dia: 0
          })
          // var cell = document.createElement("td");
          // var cellText = document.createTextNode("");
          // cell.appendChild(cellText);
          // row.appendChild(cell);
        } else if (date > this.daysInMonth(mes, anio)) {
          break;
        } else {

          // this.ArrayDays.push({ day: date })
          // ------------------
          // cell = document.createElement("td");
          // cell.setAttribute("data-date", `${date}/${mes + 1}/${anio}`);
          // cell.setAttribute("id", `f${date}/${mes + 1}/${anio}`);
          // cell.className = "date-picker";
          // ------------------


          if (date === this.today.getDate() && anio === this.today.getFullYear() && mes === this.today.getMonth()) {
            // cell.innerHTML = `<span class="txtd selected nv" id="t${date}/${mes + 1}/${anio}">${date}</span>
            // <span class="bgtxtdia selected" click="clickAgrega('bg${date}/${mes + 1}/${anio}')" id="bg${date}/${mes + 1}/${anio}">${date}</span>
            // <div class="lcitas nv" id="lc${date}/${mes + 1}/${anio}"></div>
            // `;
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
            // cell.innerHTML = `<span class="txtd nv" id="t${date}/${mes + 1}/${anio}">${date}</span>
            // <span class="bgtxtdia" onclick="clickAgrega('bg${date}/${mes + 1}/${anio}')" id="bg${date}/${mes + 1}/${anio}">${date}</span>
            // <div class="lcitas nv" id="lc${date}/${mes + 1}/${anio}"></div>
            // `;
          }
          // row.appendChild(cell);
          date++;
        }
      }
      // tbl.appendChild(row);
    }
    // console.log(this.citas)


  }

  daysInMonth(mes, anio) {
    return 32 - new Date(mes, anio, 32).getDate();
  }

  async next() {
    this.ArrayDays = []
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    await this.mostrarCalendario(this.currentMonth, this.currentYear);


  }

  async nowday() {
    this.ArrayDays = []
    await this.generaCalendario()
    await this.newCita(this.citas)


  }


  async previous() {
    this.ArrayDays = []
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    await this.mostrarCalendario(this.currentMonth, this.currentYear);
    await this.newCita(this.citas)



  }


  async newCita(citas: any) {
    if (citas.length == undefined) {
      return
    }
    for (var i = 0; i < citas.length; i++) {
      var c
      c = document.getElementById(`t${citas[i].date}`)
      // console.log(c)
      // setTimeout(() => {
      //   console.log(c)
      // }, 5000)
      if (c != undefined) {
        c.classList.remove('nv')

        document.getElementById(`f${citas[i].date}`).classList.add('nc')

        var nv = document.getElementById(`bg${citas[i].date}`)
        nv.classList.add('nv')

        var lcitas = ''
        var cl = document.getElementById(`lc${citas[i].date}`)
        cl.classList.remove('nv')
        for (var lc = 0; lc < citas[i].list.length; lc++) {
          lcitas = lcitas + `<span class="itemcita">${citas[i].list[lc].hour} - ${citas[i].list[lc].txt}</span>`
          if (lc == 2 && citas[i].list.length - 1 > lc) {
            lcitas = lcitas + `<span class="itemcita mas">Ver todas</span>`
            lc = citas[i].list.length
          }
        }
        cl.innerHTML = lcitas

      }

    }

  }


  clickAgrega(date) {
    console.log(date)
    console.log(document.getElementById(date))
    let modal = document.getElementById('crm-mobox');
    modal.classList.add('opened')

  }


}
