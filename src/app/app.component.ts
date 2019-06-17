import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'mat-ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  boxfecha = ""
  constructor() {
    console.log(new Date('6/17/2019', ))


  }

  ngOnInit() {


  }
  c = [
    {
      date: '25/6/2019',
      list: [
        {
          hour: '10:00',
          txt: 'CR',
          id: '0102-1997-00059'
        }
      ]
    },
    {
      date: '14/6/2019',
      list: [
        {
          hour: '10:00',
          txt: 'Carlos Romero',
          id: '0102-1997-00059'
        },
        {
          hour: '10:30',
          txt: 'JB',
          id: '0102-1997-00059'
        },
        {
          hour: '10:30',
          txt: 'JM',
          id: '0102-1997-00059'
        },
        {
          hour: '10:30',
          txt: 'JMRN',
          id: '0102-1997-00059'
        }
      ]
    }
  ]

  mas() {
    this.c[0].list.push({
      hour: '11:00',
      txt: 'MAS',
      id: '0102-1997-00059'
    })
    // console.log(this.c)
  }


  nuevaCita(event) {

    this.boxfecha = event
    document.getElementById('boxmodalDefault').classList.add('bxopen')
    document.getElementById('box-c').classList.add('boxmo')
  }
  verCita(datos) {
  }
  cierraModal() {
    document.getElementById('boxmodalDefault').classList.remove('bxopen')
    document.getElementById('box-c').classList.remove('boxmo')
  }

  modal() {

    this.c[0].list.push({
      hour: '11:00',
      txt: 'MAS',
      id: '0102-1997-00059'
    })
  }

  verCitasDia(datos) {
    console.log(datos)
  }

  //   title = 'mcalendar';
  //   data = [{
  //     title: "Basic",
  //     price: "$29",
  //     time: "year",
  //     values: [
  //       {
  //         value: "2GB",
  //         description: "Disk space"
  //       },
  //       {
  //         value: "20GB",
  //         description: "Traffic/mo"
  //       }
  //     ],
  //     button: "Choose plan"
  //   },
  //   {
  //     title: "Premium",
  //     price: "$49",
  //     time: "year",
  //     values: [
  //       {
  //         value: "25GB",
  //         description: "Disk space"
  //       },
  //       {
  //         value: "50GB",
  //         description: "Traffic/mo"
  //       }
  //     ],
  //     button: "Choose plan",
  //     pro: true
  //   },
  //   {
  //     title: "Premium",
  //     price: "$49",
  //     time: "year",
  //     values: [
  //       {
  //         value: "25GB",
  //         description: "Disk space"
  //       },
  //       {
  //         value: "50GB",
  //         description: "Traffic/mo"
  //       }
  //     ],
  //     button: "Choose plan"
  //   }
  // ]
  // seleccionado(i) {
  //   console.log(i)
  // }




}
