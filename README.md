# Node.js microservice template
This template has been created to develop microservices using Node.js with the same  structure and default configuration.

### Global variables
* `NODE_ENV` - application environment (usually `development` or `production`)
* `PORT` - the port that the server is listening to
* `MAIL_PASSWORD` - password for email service to send mails
* `MAIL_USER` - email user to send mails `("example@mail.com")`

### The scripts from package.json
`npm start` - to run server using node  
`npm run dev` - to run server using nodemon

### Docker
* To run docker container:  
  `docker run -p 8080:3000 -d service-name`


### The structure of the template

**.env.example** - the example of the `.env` file that contains global variables of the service. `.env.example` should be without production data. Should be in GIT;  
**.env** - the copied file of `.env.example` with real data of variables. Should be excluded from GIT;  
**.gitignore** - patterns of files or folders to ignore checking git changes;  
**server.js** - the file to start the service.  
**package.json** - the main file of information, and configuration, and dependencies of the service;   
**package-lock.json** - the file from `package.json` that contains all information about all node modules that were installed like dependencies and
devDependencies;  
