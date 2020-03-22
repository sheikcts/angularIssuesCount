import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IssuecountService } from './services/issuecount.service';

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
    spyOn(component, 'getFilesData');
    input.dispatchEvent(new Event('change'));
	fixture.detectChanges();
    expect(component.getFilesData).toHaveBeenCalled();
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
  
  it('issue counter filter input change event should arrive in getIssueCount', () => {
    const input  = fixture.nativeElement.querySelector('.search');
    spyOn(component, 'getIssueCount');
    input.dispatchEvent(new Event('input'));  
	fixture.detectChanges();
    expect(component.getIssueCount).toHaveBeenCalled();
  });
});
