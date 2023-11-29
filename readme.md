  ## Requires node v18.16.0

  
  ## Run locally ✨ 

  1. Install packages
  ~~~bash  
    npm install
  ~~~
  2. run

  ~~~bash  
    npm start
  ~~~


  ## Deploy 🚀  
  You need to follow the next steps to run the project:


  ###### 1. Install packages

  ~~~bash  
    npm install
  ~~~

  ###### 2. Generate a build

  ~~~bash  
    npm run build
  ~~~

  This build will generate a folder named `production-server` with the javascript files transpilated

  ###### 3. install pm2

  ~~~bash  
    npm install pm2 -g
  ~~~
###### 4. run with pm2

You need to locate inside the project to execute this comand
  ~~~bash  
    pm2 start production-server/index.js
  ~~~
  ~~~bash  
     Note: by default the port is 3000
  ~~~
More informacion about pm2

https://pm2.keymetrics.io/docs/usage/quick-start/

