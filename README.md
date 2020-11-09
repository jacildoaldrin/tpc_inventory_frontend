# SETUP FIREBASE ON FRONTEND: #

1.) login to https://firebase.google.com/ then click "Get Started".

2.) Create a project if you dont have one yet (can disable google analytics if you want).

3.) After successful creation, you'll be redirected to firebase console, there, you need to register your web app for the project.
    ![web-app-add image here](./doc/frontend/3.png)

4.) Now choose a name for your app.
    ![choose image here](./doc/frontend/4.png)

5.) After your app has been added, you'll be given the config for your firebase app, which were going to store in our ENV file on the frontend directory.
    ![web-app-add-config](./doc/frontend/5.png)

6.) Next, we need to setup the firebase authentication, all you have to do is click Authentication
    ![add-auth](./doc/frontend/6-1.png)

7.) click "set up sign in method"
    ![add-auth-choose-signin](./doc/frontend/6-2.png)

8.) click email/password
    ![email/password](./doc/frontend/6-3.png)

9.)  Enable then save
    ![enable](./doc/frontend/6-4.png)

10.) Now, navigate to Users, , 
    ![users](./doc/frontend/7-1.png)

11.) then click Add User button
    ![add-user-button](./doc/frontend/7-2.png)

12.) input their credentials then save, and that's it. Don't forget to update your ENV file.
    ![input-credentials](./doc/frontend/7-3.png)














# SETUP FIREBASE ON BACKEND: #

1.) Go to firebase console, select the project where you added your web app, on the upper left corner of the page, click the settings icon
    ![project settings](./doc/backend/1-1.png)

2.) then click "Project Settings"
    ![project settings clicked](./doc/backend/1-2.png)

3.) Navigate to Service Accounts tab
    ![navigate to service accounts tab](./doc/backend/2-1.png)

4.) click "Generate new Private Key"
    ![generate private key](./doc/backend/2-2.png)

5.) click confirm
    ![generate private key confirm](./doc/backend/2-3.png)

6.) then verify that the file was downloaded successfully
    ![verify downloaded file](./doc/backend/2-4.png)

7.) Now, open the backend directory, make sure youre in the Authentication branch if it's not yet implemented on the master branch, open the firebase folder
    ![firebase folder](./doc/backend/3-1.png)

8.) open credentials.json and replace its content with the credentials of the json file you were given when you generated a new Private Key.
    ![config js](./doc/backend/3-2.png)

9.) And lastly, in your .ENV file, make sure you have the right value for FIREBASE_DATABASE_URL.
    ![open env file](./doc/backend/4-1.png)

10.) This can be found on the Service Accounts Tab in Project Settings.
    ![where to find database url](./doc/backend/4-2.png)

