import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MoneyMovementService } from 'api/moneyMovement.service';
import Chart from 'chart.js';
import { OutgoingsCategory } from 'model/outgoingsCategory';
import { ResultCategoryInformation } from 'model/resultCategoryInformation';

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
});

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.styles.scss']
})
export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  public loading: boolean;

  public showSpinners: boolean = true;
  public showSeconds: boolean = true;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public dataRetrieved: ResultCategoryInformation[];
  public categoriesInformation: OutgoingsCategory[];
  public tableData: TableInformation[];
  private userId: string;

  constructor(private navigationService: Router, private MoneyMovementService: MoneyMovementService) {
    this.dataRetrieved = [];
    this.categoriesInformation = [];
    this.tableData = [];
  }

  search() {
    var start: Date = this.range.controls['start'].value;
    var end: Date = this.range.controls['end'].value;
    this.loading = true;
    this.MoneyMovementService.moneyMovementGetGet(this.userId, start, end).subscribe(res => {
      this.dataRetrieved = res.data;
      this.categoriesInformation = res.categories;
      this.tableData = [];
      res.data.forEach(category => {
        category.movements.forEach(outgoing => {
          this.tableData.push(new TableInformation(category.category, outgoing.ammount, outgoing.tag, outgoing.createdOn, outgoing.id, category.categoryId));
        });
      });
      this.calculateChart(res.data);
      this.loading = false;
    })
  }

  deleteRecord(element: TableInformation) {
    element.isDeleting = true;
  }
  cancelDeletion(element: TableInformation) {
    element.isDeleting = false;
  }
  confirmDeletion(element: TableInformation) {
    this.loading = true;
    this.MoneyMovementService.moneyMovementDeleteDelete(this.userId, element.id).subscribe(res => {
      this.search();
    })
  }

  updateRecord(element: TableInformation) {
    element.isUpdating = true;
  }

  saveUpdate(element: TableInformation) {
    this.loading = true;
    this.MoneyMovementService.moneyMovementUpdatePut(
      {
        id: element.id,
        ammount: element.ammount,
        categoryId: element.categoryId,
        userId: this.userId,
        tag: element.tag,
        createdOn: element.createdOn
      }, this.userId).subscribe(res => {
        this.loading = false;
        element.rebuildAmmount();
        element.isUpdating = false;
      })
  }

  cancelUpdate(element: TableInformation) {
    element.isUpdating = false;
  }

  calculateChart(data: ResultCategoryInformation[]) {
    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: data.map(e => e.category + " " + formatter.format(e.movements.map(x => x.ammount).reduce((prev, next) => prev + next))),
        datasets: [{
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468',
            '#ef8157'
          ],
          borderWidth: 0,
          data: data.map(e => e.movements.map(x => x.ammount).reduce((prev, next) => prev + next))
        }]
      },

      options: {
        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },
        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem("userId");
    if (!this.userId) {
      this.navigationService.navigate(["/", "login"]);
    }

    let today = new Date();
    let monthStart = new Date(today.getFullYear(), today.getMonth())
    this.range.controls['start'].setValue(monthStart);
    this.range.controls['end'].setValue(today);
    this.search();

    this.chartColor = "#FFFFFF";
  }
}

class TableInformation {
  category: string;
  categoryId: string;
  ammountStr: string;
  ammount: number;
  tag: string;
  createdOn: Date;
  id: string;
  isUpdating: boolean;
  isDeleting: boolean;

  constructor(category: string, ammount: number, tag: string, createdOn: Date, id: string, categoryId: string) {
    this.category = category;
    this.ammount = ammount;
    this.ammountStr = formatter.format(ammount);
    this.tag = tag;
    this.createdOn = createdOn;
    this.id = id;
    this.categoryId = categoryId;
  }

  rebuildAmmount() {
    this.ammountStr = formatter.format(this.ammount);
  }
}