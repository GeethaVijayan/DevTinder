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

   Explore Routing and use of &, ?,+,(),* in router
   use of regex in routes /a/, /*fly$/
   Read the Query Params 
   Read the dynamic params in route

   //
   Adding multiple route handlers for single route using next() method
   next()
   next function along with errors
   app.use(rh,rh2,rh3,[rh4,rh5]) (rh-routeHandler)
   wwhat is middleware?why we need it  (till requested route match its request handlers (those function iis called middleware))
   how expressJs handles request behind the scenes
   once a response already hits res.send next res.send cannot hht ith throw error cannot set aand also if it encounters next() before res.send it goes next function(callback) and execute the function aand then resume the next linee after return in next()
   ---------
   learn app.use and app.all
   write a dummy middleware auth for admin
   write a dummy middleware for all user(get,ost) except /user/login
  Error handling using try & catch (order is imp in req handler 
  1.error
  2.request
  3.response
  4.next)

  /conecting to Db
  create a free cluster on mongodb oficial website(mongo atlas)
  install mongose library(npm i mongose)
  connect your aplication to Database(Devtinder) conect-url\devTinder
  call the conectDb function and conect Db and then start to listen to your server

  create a userSchema and then ccreate model on userSchema
  create Post/signup API to add data to db (save the data)
  Pushh some documents using API calls from postman
  Error handling using try,catch (always handle error handling using try catch)
