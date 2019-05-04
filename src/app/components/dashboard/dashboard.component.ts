import { Component, OnInit } from '@angular/core';
import { StopwordsApiClientService } from 'src/app/stopwords-api-client.service';
import { AnalyzeApiClientService } from 'src/app/analyze-api-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stopwords: any[] = [];
  selectedStopwordList: any;
  minWordLen: number = 1;
  useStopwords: boolean = false;
  useMinWordLen: boolean = false;
  parseConnectedWords: boolean = false;
  text: string;
  analyzeResult: any;
  constructor(private stopwordsApiClient: StopwordsApiClientService,
    private analyzeApiClient : AnalyzeApiClientService) { }

  ngOnInit() {
    this.stopwordsApiClient.getStopwordsList().subscribe(res => {
      this.stopwords = res;
    });
  }

  onAnalyze(){
    this.analyzeApiClient.analyzeText({
      text: this.text,
      useStopwords: this.useStopwords,
      stopwordId: this.selectedStopwordList != undefined ? this.selectedStopwordList.id : undefined,
      useMinWordLen: this.useMinWordLen,
      minWordLen: this.minWordLen,
      parseConnectedWords: this.parseConnectedWords
    }).subscribe(res => {
      this.analyzeResult = res;
    })
  }
}
