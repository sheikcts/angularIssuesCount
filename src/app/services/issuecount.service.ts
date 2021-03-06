import { Injectable } from '@angular/core';
import { IssueList } from '.././interfaces/issue-list.interface';


@Injectable({
  providedIn: 'root'
})
export class IssuecountService {
  //public issueList: IssueList[];
  public fileHeader: Array<string> = ["First name","Sur name","Issue count","Date of birth"];
  constructor() {}
  
  //Send array of data from uploaded file data
  postFormData(csvData: String) {
    let response = [];
    if (csvData) {
      let csvRecordsArray = ( < string > csvData).split(/\r\n|\n/);
      let headersRow = this.getHeaderArray(csvRecordsArray);
      if(JSON.stringify(headersRow) === JSON.stringify(this.fileHeader)) {
        response['data'] = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        response['status'] = true;
      } else {
        response['status'] = false;
      }
      
    }
    return response;
  }

  //Get csv file readed data to array
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = (csvRecordsArray[i].replace(/['"]+/g, '')).split(',');

      // For each row in CSV file if the number of columns are same as header columns
      if (data.length == headerLength) {
      let csvRecord: IssueList[]=[
      {
        firstName: data[0].trim(),
        surName: data[1].trim(),
        issueCount: data[2].trim(),
		    dob: data[3].trim()
      }
      ];
   

        dataArr.push(csvRecord[0]);
      }
    }
    return dataArr;
  }
  //Get header array of CSV file
  getHeaderArray(csvRecordsArr: any) {
    let headers = ( < string > csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j].replace(/['"]+/g, ''));
    }
    return headerArray;
  }
}