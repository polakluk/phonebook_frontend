# EGA Data Submission database (mEGAdata)
##### Proposal for Canadian Center for Computational Genomics

## Project Information
* Title **EGA Data Submission database (mEGAdata)**
* URL: https://bitbucket.org/mugqic/gsoc2016/overview#markdown-header-ega-data-submission-database-megadata

## Information about mentor
* Name: **David Bujold**
* Email: **david.bujold@computationalgenomics.ca**

I initially contacted David Bujold on March 15th after I already finished the first part of the selection test and was learning AngularJS to finish the second part. The first email contained preliminary questions about details of the project. Then, I sent him my code for selection test on March 19th and received more detailed information about the project on March 22nd. Ever since that, we kept in touch and discussed the project. On March 23, I sent him the first draft of my application and received his feedback on it. 

## About me
* Name: **Lukáš Polák**
* Email: **polak.lukas90@gmail.com**
* Github profile: **polakluk**
* Time zone: **GTM +1**
* Skype: **zahorak90**
* Postal address: **Druzstevna 1550, 90877 Borsky Mikulas, Slovakia**

### Education

##### Faculty of Information Technology, Czech Technical University in Prague
Master’s degree: **Knowledge Engineering**  
*Sept 2014 – Jan 2017 (expected)*  
Contact to verify: **Ludmila Facer** (ludmila.facer@fit.cvut.cz)

##### Union College, Schenectady
Study abroad  
*Sept 2013 – Jun 2014*

##### Faculty of Information Technology, Czech Technical University in Prague
Bachelor degree: **Software Engineering**  
*Sept 2010 – Jun 2013*

### Work background
#### Dioscouri Design (Senior Developer)
*(Oct 2010 - Now)*  
Recently, we developed and currently maintain light-weighted open-source CMS running on PHP and using MongoDB (http://github.com/dioscouri) based on micro framework Fat-free framework. This CMS is used by companies to run their intranet applications (see references on [site](http://dioscouri.com/#clients "site"). In past, I worked on open-source ecommerce solution for Joomla! CMS – Tienda – of which development I led for one year. My responsibility was to keep development on track and deliver stable version at least every 6 weeks.

#### Joomla! Student Outreach Program! (Student participant)
*(Summer 2010)*  
In 2010, Joomla! did not make it to Google Summer of Code program so they created a program for volunteers. I joined a team of 4 people which tried to create a new project management tool. We iterated over several agile development cycles and created a decent UI for the tool. Unfortunately, right after the program ended, members of the team fled to other projects. Report from our work can be found at [this](https://magazine.joomla.org/issues/issue-dec-2010/itemlist/user/239-lukaspolak) link.

### Hobbies and free time activities
Currently, school and work duties take up a lot of my time, but I do try to stay active in order to keep my mind and spirit in balance. Most often, I find myself running outside in nature or playing sports with friends. Also, I have been a volunteer in our local Erasmus Student Network branch for 5 years now at various coordinating positions. This experience taught me more about being a team player when working in smaller groups with other members on projects. Moreover, it heighten my sense to finish the job I started successfully. As a main organizer of event with hundreds of students attending it, I had to exercise my sense of punctuality and ability to think outside of the box when events did not follow the plan.

## Proposal

### Synopsis
This project describes necessary steps to finishing the program that helps scientists to submit their research data to  European Genome-phenome database.At the beginning, the proposal describes concrete step required to refactor the current code to support SQLite database. Then, it describe steps necessary to finish the application including implementation of autocomplete functionality using ontology. For each step, it lists potential problems and how to deal with them. In order to make the program easy to install for everybody, using Vagrant is suggested. The proposal explains what the Vagrant script will do. Then, for user authentication, an implementation of feasible solution based on Google OAuth2 is explained with fall-back solution for localhost-only installations. Lastly, the proposal imposes strict policy to update documentation on weekly basis to ensure its correctness.

### Benefits for the community

The benefits of this project to the community of scientists are numerous. The goal of this project is to provide an automated way to submit larger amount of samples to the shared database, from which other fellow scientists can request them. Making this process less painful for scientists and less prone to errors can increase their productivity. Not only it saves their time when sharing their data with others, but it makes the data more consistent. Using the program to generate output XMLs leaves. Last, but not least, providing a platform-independent application with automated installatino script can save them their valuable time which can be then used on research. Even scientists without extensive computer skills will be able to install the program and use it immediately without any problems.

### My motivation
As I am in my last year of my studies, I plan on spending my last summer working on something interesting and beneficial for community around me before I start a full-time job. For past several years, I have been developing PHP web applications, so I am looking for a fresh new experience. That is, where this project comes into play. The project combines technologies which I was eager to try.

Prior to submitting code for selection test, I had to learn AngularJS and Python Flask framework. By doing so, I wanted to demonstrate the dedication I am willing to give to the project that interests me and poses the type of challenge for me that I am looking for. My expectations from this project are that I improve my skills in AngularJS and Python Flask.Furthermore, I look forward to familiarizing myself with Vagrant. Cooperation with a mentor from overseas is not an issue for me since I have been working for New York-based company for quite some time and, thus, got used to the usual communication problems presented by different timezones.

### Description of work
This project is based off of source code provided by David Bujold. Currently, the project is using MySQL database to store data. During this project, both frontend and backend application will be refactored and extended by several new features like autocomplete on ontology fields, management of metadata and more. The output of frontend application will be a list of generated XML files with a python file that can be run to upload these XML files to the database. In order to make sure that documentation will be completed at the end of the project, the documentation will be updated according to what was finished over the week at the end of each week. Format of the documentation can be, either a PDF file uploaded to the repository, or a list of Markdown-ed files. This decision should be made in cooperation with mentor before week 1.

##### Week 1
The work should start by refactoring both backend and frontend code. In backend, code for REST API should take advantage of python module *flask-restful*. Each resource should have its own Resource class in directory *resources* in order to keep them consistent. This will help to increase code readability and to give us a better handle over format of response. Also, each response from REST API should carry information, if an error has occurred during processing the request along with an optional information from REST API. Having this information in response object makes it easier to handle the errors in frontend. In order to make REST API consistent, every insert and remove operation in REST API should return ID of manipulated object in *payload* so frontend can react to this fact. Thus, the proposed format of response is this object:
```
{ 
  error : "True or False depending on whether an error has occurred",
  msg : "Text of optional message from REST API",
  payload : "Data requested from REST API"
}
```

Each Resource class should have a corresponding *peewee.Model* class in directory *models*. These models take care of accessing data in database.

In frontend, the code should be updated to use templating. *Angular UI Router*. In comparison to  *Angular Router*, this extension supports easier handling URLs which can be helpful once the program becomes larger. Then, controllers should be rewritten to delegate HTTP communication to *$resource* class services. This makes the code easier to read and maintain.

Afterward, SQLite database should substitue MySQL database. This process will be twofold. Firstly, the create SQL script for tables will have to be updated for SQLite dialect of SQLite which cannot handle *foreign keys*. Since foreign keys are used as integrity constrain for metadata, this constrain will have to be checked manually in code. Secondly, backend code has to be change to open a connection to SQLite database instead of MySQL. The code is using *peewee.Model*s, so nothing else has to be changed at the moment.

##### Week 2

Metadata properties differ based on their affiliation (Donors, Samples and etc.). Thus, a consolidated approach to work with them should be considered. Metedata properties should be stored in a single table with following structure:

```
metadata_properties {
  id : "Metadata property ID",
  name : "Name of the property shown in forms"
  typeProperty : "Type of the property (int, string, boolean, proprietary or other)",
  affiliation : "Declares affiliation with modules (Donors, Samples and etc)",
  additinoalAttributes : "List of additional attributes for input field",
  required : "True or Falshe whether the field is requierd",
  isExportedEga : "States, whether the property is part of the final export XML"
}
```
Then, metadata values can be also stored in a single table with following structure:

```
metadata_values {
  id : "Metadata value ID",
  property_id : "Metadata property ID",
  collection_id : "ID of collection of metadata to wthi the value is assigned to"
  value : "Value"
}
```
Lastly, the metadata values should be assigned to metadata collections with the following structure:
```
metadata_collections {
  id : "ID of collection of metadata"
  typeAffiliation : "Affiliation of the collection in database (to Donors, Samples or others)",
  title : "Title describing the collection",
  references : "Number of references to this collection in database"
}
```

The abovementioned structures enable managing collections of metadata from a central place in application. *Metadata collections* are a group of *Metadata properties* with *Metadata values* assigned to them. These collections will be used to input experiment data. A user will be able to manage list of properties for each module by adding, updating or removing any property via user interface.

In case a proprietary type of property is requiered (for example picking a value from a fixed set of values), *typeAffiliation* field of *Metadata property* is set to "proprietary". Then, field *additionalAttributes* is used to specify type of the proprietary property. In code, this attributed is added to HTML of input field as attribute and later picked up by AngularJS. An AngularJS decorator with the same name should be created and handle logic of the proprietary input field.

When adding a new collection of metadata values, user is propted to select their affiliation (Donor, Samples or others) and then showed HTML form with all propertied asigned to this affiliation from table *Metadata properties*. During rendering HTML form, the code should add any *additionalAttributes* to inputs, in order to link them with additional AngularJS decorators (for example to restrict age range for certain fields).

##### Week 3

Every study contains numerous files with datasets. The application requiers a user interface that is capable of importing their location along with their MD5 hashes. User will be able to insert, modify or remove any specific file with dataset from within the interface.

Moreover, import batch functionality should be created. User should be able to upload a file in CSV format to add multiple files into database. This import feature will perform operations insert, update and delete based on type of row. Therefore, if any record has changed (data in dataset has change) or was removed from the study, this change can be reflected in one coherent CSV file.

The format (Columns) of import CSV is following:

```
{
  Filename : "optional filename of the file; if left blank, *Location* value is used",
  Location : "location of the file",
  MD5 : "current MD5 hash for this file",
  type : "type of dataset",
  operation : "operation that should be performed on this row"
}
```

Field *operation* should contain a word representing desirable operation. So values "insert", "update", "delete" are only accepted. If the value does not match any of them, then the row is skipped. String representation of the operation has been deliberately choosen to make it more obvious to user what will be done with the row. Delete operation tries to match a row in table by *filename* and *type* value. If it fails to match a row, the row is skipped. Update operation will try to match record having the same *filename* and the same *type*. If it fails, it resorts to inserting the row. On the other hand, if script finds that a record with the same *filename* and *type* already exists in table, it should ask user to resolve the situation. There are 3 possible solutions for this conflict:

* add a tailing number to filename (i.e. "file.somethong" would become "file (2).something")
* change the filename (user will be prompted to insert new filename which will be then, again, checked against the database for conflicts)
* skip the record

Since the import file can contain countless rows with numerous potential conflicts, user can select how to solve conflicts at the beginning of import by picking one of the following options:

* always add tailing number
* always skip the record
* always ask

At the end of importing data, a short summary of the process is provided to user. The summary contains statistics about number of imported rows and skipped rows. Also, there may be an option to export list of skipped rows for later examination.

##### Week 4

This week will be reserved to catching up on any pending issues with the code written in past 3 weeks. Then, a small number of unit tests can be written to cover communication between frontend and backend application. The unit tests can be used to check the status of application at the end of each week for any inconsistent changes in the code. Also, user documentation of current available features should be checked and finished. This documentation will include information on how to install the application and how to run them. Then, the project will be prepared for submission for midterm evaluation. If everything is finished and there is still some time left, working on tasks for the upcoming week can begin. 

##### Week 5-6

At the moment, donor samples are added purely by editting Handson Table in Samples part of application. Every time a sample is added, its metadata have to be added again. However, a more coherent way to add or update them is favorable, so an HTML form that allows them to enter all values at once should be added to the application. User should be able to select *Metadata collection* relevant for the sample and then enter values. Similarly, HTML for for adding and updating Donors should be created to make this process more coherent for users. 

Then, scripts generating XML are currently written in PerlL. However, a python script would be a more favorable for them based on my communication with David Bojuld. The added benefit of having them written in python is being able to run them from within backend application easily. In order to convert them, I will have to understand the format for each XML document and write separate script for it. The estimation is that each type of file will take me aroun half of a day to understand and finish the script for it. 

##### Week 7

One module of frontend application should allow users to search for a specific term accross all entities in table. When user searches for the term, the results will be showed in tabbed view. Each tab will contain a table with first *n* (*n* will be selected by user before searching) records from the category match the sought for term. A category represents one part of the submission process and users, so categories are "Metadata values", *Datasets*, *Experiments*, *Donors*, *Samples*, *Users* and any other relevant tables. Then, user can click and paginate through results from one specific category by clicking on button "Show More" in respective tabs. User can also specify categories which they want to search through by checking check boxes in list of available categories.

##### Week 7-8

The next step should be making sure that anybody can easily setup and run the application. For this job, I picked *Vagrant*, thanks to its platform independence. The program combines two the most important features - it is platform independent and it is easi to set up even for non-technocal person.  As I never worked with Vagrant, I expect to run into several difficulties with it along the process of learning it. However, I have friends in community of people who use Vagrant extensively and frequently write scripts, so writing the script file will not pose a huge problem. The created script should be able to set up an environment in which:

* python with all required dependencies is installed
* backend REST API service is running
* lightweighted server is running in order to support Angular theming
* default data are loaded into SQL database

Therefore, the user should be able to run the application by running command "vagrant up" from directory with the application.

##### Week 8-9

Autocomplete function integrated with ontology server provides an easier way for users to enter data without error. Another column should be added to table *metadata_properties* called "ontology_name". If *typeProperty* is **ontology** input field for the metadata property should enable autocomplete function communicating with na ontology service. The ontology service will be picked based on communication with mentor before coding starts.

The autocomplete feature will be implemented as an AngularJS decorator that will be added to the input field. This decorator will communicate with AngularJS service that will handle communication with service's REST API.

##### Week 10

*OAuth2* does not work with *localhost*, therefore a different approach has to be selected. In config file, user can select which authentication method they want to use, based on their environment. If the application will run on server, *OAuth2* will be recommended.

##### Submission script from within the application

The output of the application should be an executable script that takes care of sending data to the servers. In this stretched goal, an attempt to automatize this process will be made. The functionality can be initially implemented as an extension over creating the executable Bash script. In this scenario, the executable script is generated and then run by the application. Script execution will be handled in backend application via REST API call. The backend application returns status of this operation following the response format established at the beginning of this proposal. 

After this approach is functional, the process can be tweaked and improved. One of the improvements is to stop using Bash scripts and control the submission process from within python script. This would make the application truly independent and easier to use for users.

##### Allow multiple studies

Currently proposed design for the application supports only one study in one instance of the application. However, extending the data model to support studies would be desirable. In frontend, list of studies should be accessible and user should be able to create, modify or delete any study. Every implemented frontend module should respect the selected study. Thus, when showing donor samples, only samples from the selected study should be displayed. This can be achieved by adding an additional table with the following structure (additional attributes can be added based on communication with mentor during summer):

```
Studies{
  id : "ID of the study",
  title : "Title of the study",
  description : "Short description of the study (optional)"
}
```

Then, tables *Metadata.values*, *Donors*, *Samples*, *Experiments* and ant other relevant table should include *study id* in their model.  Other relevant tables can be tables handing proprietary custom input fields data (like type of subjects in the study).

### Deliverables
The outcome of this project should be following (including estimated week of delivery):
 
* Code refactoring + switch from MYSQL to SQLite.
  * Delivery: **week 1 (May 27th)**
 

* CRUD interface for manipulation with metadata collections + update existing parts of application to take advantage of it.
  * Delivery: **week 2 (June 3rd)**


* Create interface that can load in bulk and manage from a CSV file list of file locations with their respective  MD5 hashes.
  * Delivery: **week 3 (June 10th)**


* Writing unit to test communication between Front-end application with back-end application & user documentation for finished parts.
  * Delivery: **week 4 (midterm evaluation June 17th)**


* Donor sample editor + refactoring XML generation scripts.
  * Delivery: **week 5-6 (July 1th)**


* Implemented global application search that enables searching through donors, samples, datasets and their metadata. 
  * Delivery: **week 7 (July 8st)**


* Integration with Vagrant. 
  * Delivery: **week 7-8 (July 15th)**


* Implemented autocomplete feature using ontology.
  * Delivery: **week 8-9 (July 22th)**


* Implemented user authentication. 
  * Delivery: **week 10 (final evaluation July 29)**


* Launching the submission script from within the application. 
  * Delivery: **stretch goal**


* Allowing multiple studies in one application
  *  Delivery: **stretch goal**

This proposal leaves 2 weeks as a time reserve in case specific tasks take longer than expected or any other unexpected event occurs. In case the project will be finished before August 23rd, I will focus on working on extra features which are mentioned in timeline above as stretch goals.

### Tests and management of code
In my opinion, creating unit tests for this project would not yield significant results in comparison to the time spent on them. A small number of unit tests to make sure that generated XML files are valid can be created over the course of 12 weeks. However, a better determining factor of success is a check list of features which should have been done over the period of time. At the beginning of every meeting, some time should be reserved for going over the changes which occured since the last meeting. When discussing the plan for next week during the meeting, a list of features which should be added to the program is written. At the same time, mentor  test the program after the meeting and send additional feedback, in order to At the end of each evaluation period, the application is manually tested against list of the features, if all of them are satisfied. A preliminary list of features is the proposed timeline for this project.

The code will be stored in Git repository. During working days, I expect to make several smaller commits. Smaller consistent commits will help me to rollback a code that breaks something easier. Also, it provides more descrete overview over added featues. A solid indication of a problem for me would be a sudden lack of commits for a longer period of time (1-2 days in a row).

## Availability over summer
I am prepared to fully focus on Google Summer of Code over the summer. This means that I can contribute 30-35/hours per week to the project. I would like to reserve 5-10/hours per week for developing other programming skills based on my preferences and other activities outside of this project. Also, exam period in our school starts right before Google Summer of Code starts, thus I will need to spend 10-15 hours during the first week on preparing for my exams.  Last, but not least, I plan on taking 2 or 3 short trips over the summer. In case I get accepted for this project, I will adjust their dates according to the project schedule. On the chance that the trip will be longer than weekend, I would adjust my work time to make up for the time loss, if needed.

Preferably, we set up an time for meetings with the mentor and hold at least one check-in meeting every week. Based on my previous experience, Thursday night is the best choice. There is enough time to adjust the code based on feedback from the mentor. Moreover, it is late enough in the week that it is OK to discuss tasks for the upcoming week in order to avoid potential problems.