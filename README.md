# Phonebook front-end in AngularJS


Front-end application for example phonebook application written in AngularJS using Handson tables.

## How to install

The application is using AngularJS and Handsontable jQuery module via AngularJS module "nHandsontable". In order to run the application, it is recommended to install a light-weighted 
server (required for AngularJS to be able to access theme HTML files). All JavaScript libraries required by this application are, either included in this repository, or loaded from CDN.

The recommended light-weighted server is browser-sync. You can install it via command-line using command (requires administrator rights). In Windows, it may require you to restart Powershell console:

 ```
 npm install -g browser-sync
 ```

## How to run

In order to run this application, you have to run the local server. Navigate to the root directory of the application and run following command in command-line:

```
browser-sync start --server --port 3001 --files="./*"
```

Now, you can navigate to page http://localhost:3001/ in your browser to access the application.
