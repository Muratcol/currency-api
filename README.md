# Currency API

This project was generated with Express.js.

In my project, 161 different currencies are kept up to date with a dynamic 0.5 second intervals. Default currency is Turkish Lira.
MongoDB connection already setted. Authentication systems with JWT token setted.

The app will automatically reload if you change any of the source files.


---
## Requirements

For development, you will need MongoDB account, Node.js and a node global package, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.16.3

    $ npm --version
    6.14.4

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---
### mongoDB
- ### mongoDB Account

	If you don't have a mongoDB account, create a free mongoDB account below link

	[official mongoDB website](https://www.mongodb.com/cloud/atlas/register)

- ### mongoDB Connection

	After you create mongoDB account, create a new cluster and go to `appDir/config/env/config.env` and update the settings with below

	`MONGO_URI=mongodb+srv://<username>:<password>@<cluster name>-twfor.mongodb.net/<dbname>?retryWrites=true&w=majority`


## Install

    $ git clone https://github.com/Muratcol/currency-api
    $ cd currency-api
    $ npm install

## Configure app

Open `appDir/config/env/config.env` then edit it with your settings.

	`PORT=5000` You can configure the as you desire.

	`JWT_SECRET_KEY = hellodarknessmyoldfriend`   This is dummy secret key which I made up
	`JWT_EXPIRE = 10m`   JWT Token expire time. You can change expire time with anything you want

	`SMTP_USER =` Your own gmail address
	`SMTP_PASSWORD = `  Your own gmail password

## Running the project

    $ npm start

## Simple build for production

    $ npm build