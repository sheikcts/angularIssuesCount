import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IssuecountService } from './services/issuecount.service';
import { IssueList } from './interfaces/issue-list.interface';
import { ElementRef, asNativeElements } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: IssuecountService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
	  providers: [IssuecountService]
    }).compileComponents();
	fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
	  service = TestBed.get(IssuecountService);
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular Issues Count Application'`, () => {
    expect(component.title).toEqual('Angular Issues Count Application');
  });

  it('should render title in h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular Issues Count Application');
  });
  
 
  
  it('file change event should arrive in getFilesData', () => {
    const input  = fixture.nativeElement.querySelector('.file');
    spyOn(component, 'getFilesData').and.callThrough();
    input.dispatchEvent(new Event('change'));
	  fixture.detectChanges();
    expect(component.getFilesData).toHaveBeenCalled();
  });

  it('should return error message if uploaded file is not csv', () => {
	  const fileList = {files:[{name: 'foo.doc', lastModified: 1453752684198, size: 181}]};
	  const result = component.getFilesData(fileList);
		expect(component.errorMsg).toBe('Please upload valid .csv file!');
  });
  
  it('should able to filter records by issue count', () => {
    const issueCount = 1;
    component.totalRecords = [
        {firstName: "Theo", surName: "Jansen", issueCount: 5, dob: "1978-01-02"},
        {firstName: "Petra", surName: "Boersma", issueCount: 1, dob: "2001-04-20"}
    ];
    const result = component.getIssueCount(issueCount);
    const filteredRecords = [
      {firstName: "Petra", surName: "Boersma", issueCount: 1, dob: "2001-04-20"}
    ];
		expect(component.issueList).toEqual(filteredRecords);
  });
  
  it('should able to return all records if empty of issueCount value', () => {
    component.totalRecords = [
        {firstName: "Theo", surName: "Jansen", issueCount: 5, dob: "1978-01-02"},
        {firstName: "Petra", surName: "Boersma", issueCount: 1, dob: "2001-04-20"}
    ];
    const result = component.getIssueCount('');
		expect(component.issueList).toEqual(component.totalRecords);
	});
  
  it('should return true if file upload input is csv', () => {
	  const fileList = {name: 'foo.csv', lastModified: 1453752684198, size: 181};
	  const result = component.isCSVFile(fileList);
		expect(result).toBe(true);
	});
	
  it('should return false if file upload input is not csv', () => {
	  const fileList = {name: 'foo.doc', lastModified: 1453752684198, size: 181};
	  const result = component.isCSVFile(fileList);
		expect(result).toBe(false);
	});
  it('should be able reset fields', () => {
    spyOn(component, 'fileReset').and.callThrough();    
    component.issueList = [{firstName: "Theo", surName: "Jansen", issueCount: 5, dob: "1978-01-02"}];
    component.totalRecords = [{firstName: "Theo", surName: "Jansen", issueCount: 5, dob: "1978-01-02"}];
    const result = component.fileReset();
    expect(result).toBe(true);
  });
  /*it('issue counter filter input change event should arrive in getIssueCount', () => {
    const input  = fixture.nativeElement.querySelector('.search');
    spyOn(component, 'getIssueCount').and.callThrough();
    input.dispatchEvent(new Event('input'));  
	  fixture.detectChanges();
    expect(component.getIssueCount).toHaveBeenCalled();
  });*/
});
