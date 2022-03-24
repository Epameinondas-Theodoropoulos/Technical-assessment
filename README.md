# AngularTechnicalAssessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Structure

The project has 4 Folders and the main app.compoment.

> The 4 folders are: 
- coctails-listing --> coctail
- headers
- page-not-found
- services
- models

> Modules:
- app.module // Basic module
- coctail-listing.module // Module for the listing of coctails
- coctail.module // Module for the View of one Coctail
- page-not-found.module // Module for wrong URL

> Services:
- base-data.service // Service for the functions of HttpClient
- coctails.service // Service for the endpoints from the Coctails API
- color-scheme.service // Service for the Darkmode
- storage.service // Service for the Storage interconnection

> Models
- coctail.model // the general Object form the APIs
- Drink.model // An Object that has inside the above Object
- Enums // An enum file that I created for help

> NPM Installs
- bootstrap
- bootstrap-icons
- @popperjs/core // for bootstrap

## Description

The user opens the browser and redirect to locahost:4200/coctails-listing. 
There we can see the listing of the coctails in grid. The structure is that the component have a connection with a service that I  call [.presenter.ts] . There exist the functionality that is responsible for creating the view for the user. In the [component.ts] we have only the variables and the methods that the user has interaction and they are connected with the view.

I have implemented an kind of infinity scroll. When the user first enter in the page I call the API and the first coctails that begins with the letter 'a' appears in the screen. When the user scroll to the end of the page we have others calls for the next letters in the alphabet until the letter 'z'. With the approach the page loads faster and the user can see a portion of the coctails.

When the user clicks a category a new API call begins and the user can see all the coctails foe this category. The category API does not return the ingredients so I appear only the category that it appears in the JSON response. 

When the user clicks the the search and start to write, a new API call begins and the user can see all the coctails that contain the letters.

Thse 2 functionalities do not overlap each other. By that I mean that if the user has clicked a category and the result is 10 coctails, if then type in the search field, the search is not about these 10 coctails, but is a new API call that returns different result. 

When the user clicks the button 'Check the coctail', a routing send the user to coctail.module that the user can see the details about the component.

The Darkmode is a functionality that make use the classes of bootstrap and the class [.dark] that I created in [styles.scss]. There exist the colors for the Darkmode. When the user clicks the Darkmode the method [setColorScheme] is used inside [color-scheme.service.ts] and I apply the [.dark] in the document with the result of changing the colors.
In some instances I change the color manually with a Subject because they did not have a class in Bootstrap.

The project has some responsiveness with some bootstrapp classes and media only screen in scss
