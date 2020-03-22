# Rabobank Issues Count Application (UI)
Create an Angular app that is capable of importing the attached csv-file and visualize it on the screen.

## Input : 
issues.csv file.(Sample file available in /assets/issues.csv)
```bash
“fname”,”lname”,”issueCount”,”dateOfBirth”
"Theo","Jansen",5,"1978-01-02T00:00:00"
"Fiona","de Vries",7,"1950-11-12T00:00:00"
"Petra","Boersma",1,"2001-04-20T00:00:00"
```

## Expected Output :
* User should be able to select this file from my computer and see the results on screen.
* User should be able to filter the results based on minimal issue count.

# Steps to run the application
1.	Clone the project Angular Issues Count Application
```bash
git clone https://github.com/sheikcts/angularIssuesCount.git
```
2.	Run "npm install" command and run "ng serve" or "npm start" command.
3.	Access http://localhost:4200 url
4.	Browse and upload input csv file from my computer and output will be displayed in the table
5.	Also,User can able to search/filter data using filter text box. The values will be filtered based on issuecount column.
