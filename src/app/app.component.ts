import { Component, OnInit } from "@angular/core";
import axios from "axios"
import { Compiler } from '@angular/core';

@Component({
  selector: "app",
  template: require("./app.component.html"),
  styles: [require("./app.component.scss")]
})
export class AppComponent implements OnInit {
  private http = axios
  quote: string;
  title: string;
  constructor(private compiler: Compiler) {}

  async quoteGen() {
    try {
      let res = await this.http({
        method: 'get',
        headers: {'Cache-Control': 'no-cache'},
        url: 'http://localhost:5000/api/getquotes?random'
      })
      console.log(JSON.stringify(res.data))
      console.log(res.data)
      this.title = res.data.title
      this.quote = res.data.content
    }
    catch(e) {
      console.log(e)
    }
  }
  ngOnInit() {
    this.quoteGen()

  }
  newQuote() {
    this.quoteGen()
  }

}