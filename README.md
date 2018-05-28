# user-mgmt-backbonejs
Basic user management app in BackboneJS

This app demonstrates a basic user management system involving CRUD operations.

### Problem statement:

Create a user management system:
1. Display a list of users (first name + last name) coming via API (https://reqres.in/)
2. Edit existing users info - both first name and last name
3. Create new users - both first name and last name are mandatory and cannot be empty
4. Delete users
5. Ask for confirmation before deleting a user
6. System must have at least 1 user. If only 1 user exists, do not allow deletion.

### Steps to run
1. Clone the code on your local machine
2. Run `npm install` to install **bower** and **http-server** 
3. Run `bower install` to install JavaScript dependencies
4. To run the app, use the startup script `npm start`
5. Visit `localhost://62887` (localhost:octus) to access the app

### Demo
To view live demo, visit Plunker at [http://plnkr.co/edit/Nj5atcosy9NAzQjciHFb](http://plnkr.co/edit/Nj5atcosy9NAzQjciHFb)

### Areas of Improvement
1. Automated build using `gulp` or `grunt`
2. Use a CSS preprocessor like `Sass`
3. Responsive for smaller screens
4. Add more user feedback in form of loading GIFs
5. Improve alert dialogs
6. Update *bower* to *yarn*
7. Add test cases
8. Separate templates into individual files (maybe use a template loader or switch to something like Marionette)
9. Better segregation of JavaScript files
