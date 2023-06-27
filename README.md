# Document Generator

SPA with Vue 3, Toast UI Editor & more  


## Info

Document generator based on [Toast UI Editor](https://github.com/nhn/tui.editor) markdown text editor. Choose a template or compose your own document, which is displayed in a preview window, and export the result in PDF format.  


## Setup

SPA with Vue 3, Vue Router, Toast UI Editor, TS, jsPDF & html2canvas  


## Getting Started

### Prerequisite

Install [Node.js](https://nodejs.org/en/)  


### Installing

* Clone the project  
* Open a terminal 
* Navigate to the project root directory  
* Run `npm install`  


### Executing program

* Open a terminal 
* Navigate to the project root directory  
* Run `npm run dev`  
* Follow generated link


### Build the app

* Open a terminal 
* Navigate to the project root directory  
* Run `npm run build`  
* Get contents of `dist` folder  


### Deploy the app

* Copy on your hosting the content of the `dist` directory just created
* Add an .htaccess file to the root as :
```
    <IfModule mod_negotiation.c>
        Options -MultiViews
    </IfModule>
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>
```


## Authors

[sabine-xuaitsep](https://www.webdeveloperie.be/)


## License

This project is licensed under the MIT License - see [LICENSE.md](https://github.com/sabine-xuaitsep/DocumentGenerator/blob/main/LICENSE.md) for details