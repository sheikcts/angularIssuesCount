import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IssuecountService } from './services/issuecount.service';
import { IssueList } from './interfaces/issue-list.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IssuecountService]
})

export class AppComponent {

  title = 'Angular Issues Count Application';
  public issueList: IssueList[];
  public totalRecords: IssueList[];
  public successMsg:string;
  public errorMsg:string;
  public file: Array<string> = [];

  constructor(private issuecountService: IssuecountService) {

  }

  @ViewChild('fileImportInput') fileImportInput: any;
  @ViewChild('search') search: any;
  
  //Get uploaded files data
  getFilesData(files: any) {
    let uploadDataFiles: FileList = files.files;
	  this.successMsg = '';
	  this.errorMsg = '';
    //this.file = uploadDataFiles[0];

      if (this.isCSVFile(uploadDataFiles[0])) {
        let reader = new FileReader();
        reader.readAsText(uploadDataFiles[0]);

        reader.onload = () => {
		      let fileData: string = reader.result as string;
          this.issueList = this.totalRecords = this.issuecountService.postFormData(fileData);
		      //this.search.nativeElement.value = "";
		      this.successMsg = 'Data populated from uploaded file!';
        };

        reader.onerror = function() {
          alert('Unable to read ' + uploadDataFiles[0]);
        };
      } else {
        this.errorMsg = 'Please upload valid .csv file!'
        this.fileReset();
      }
  }

  //Filter Issue count from uploaded file data
  getIssueCount(e: number) {
	  let records = [];
    if (e) {
      records = this.totalRecords.filter(c => c.issueCount == e);
    } else {
      records = this.totalRecords
    }
	  this.issueList = records
  }



  // Check if uploaded file is CSV
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  //Reset input fieds values
  fileReset() {
    this.fileImportInput.nativeElement.value = "";
	this.search.nativeElement.value = "";
    this.issueList = [];
    this.totalRecords = [];
  }

}