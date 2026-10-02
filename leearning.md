1.create a repository and initialise it with npm init
2.install express .json npm install express
3.get to node modules, pkg.json ,pkg-lock.json,
4.create request handlers(route) 
5.install nodemon for auto refresh npm install -g nodemon
6. add commands in pkg.json scripts for easy run  npm run dev
7.difference between caret ^ aand tilde ~
8. difference in version 4.9.0 (major,minor,patch version)


//to add our local to github profile 
git remote -v 
create a new repository in github profile 
take the new repo url 
in our project local 
 local/users/projjet> git remote add origin url(new repourl)

 //Play with routs and its extensionss 
 //order of routes matters alot . It  is important comes from top to bottom

 //install postman app (specificaly for http methodds test)
 make test api call and save it

 write logic to handle httpmethods
   get,post,patch ,delete (app.use overwrites all ) and test it on postman