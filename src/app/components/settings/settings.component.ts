import { Component, OnInit } from '@angular/core';
import { StopwordsApiClientService } from '../../stopwords-api-client.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  selectedTitle: string = "";
  contentList: any = [];
  commaSeparatedContent: string = "";
  stopwords: any;
  selectedStopword: any;
  createItem: boolean = true;
  newStopword: any = {
    id: undefined,
    content: "",
    title: ""
  };
  constructor(private apiClientService: StopwordsApiClientService) {
    this.apiClientService.getStopwordsList().subscribe(res => {
      this.stopwords = res;
    });
   
  }

  ngOnInit() {
  }

  public selectStopword(stopword) {
    this.createItem = false;
    this.selectedStopword = stopword;
  }

  onCreateButtonClick(){
    this.createItem = !this.createItem;
    this.selectedStopword = undefined;
  }

  onUpdate(stopword) {
    this.apiClientService.updateStopword(stopword.id, stopword).subscribe(res => {
      this.stopwords = res;
    });
    
  }

  onCreate(stopword) {
    this.apiClientService.createStopword(stopword).subscribe(res => {
      this.stopwords = res;
    });
  }

  onRemove(stopword) {
    this.apiClientService.deleteStopword(stopword.id).subscribe(res => {
      this.stopwords = res;
    });
    // var stopwords = JSON.parse(localStorage.getItem("stopwords"));
    // var deleteRow = stopwords.find(x => x.id == stopword.id);
    // let index = stopwords.indexOf(deleteRow);
    // if (index !== -1) {
    //   stopwords.splice(index, 1);
    // }
    // localStorage.setItem("stopwords", JSON.stringify(stopwords));
    // this.stopwords = stopwords;
  }

 
}
