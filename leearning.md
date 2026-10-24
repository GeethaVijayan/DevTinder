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
  
  difference between javascript and JSON
  Add express.json middleware data for conversion of json(") into js object 
  make your signup api dynmaaic to receive data from anywhere(dynamic data in signup)
  findOne() - it will find based on conditions eg: it will find emailid which is matching but what if we give 2 similar emailId the condition will return find which emailId matching object - soln to avoid these conditions we are adding unique in schema description under {email:"geetha", unique:"true",required:"true"}
  //GET API
  Feed API
  Creaet a api where you can get userbyId
  Method	What it returns
findOne({ email })	-One matching document
find({ email }) -	All matching documents
findOne({}) -	One document without filtering
find({})=	All documents without filtering

if you are querying by id use findById(),findlatest()
GET API based on email
FEED APPI (All Api)
Get user by Id
create a delete user API
Difference between Patch and Update  (findByIdAndUpdate & findOneAndUpdate)
Explore the mongoose documentations for model methods
what are the options in model.findoneAndupdatemethod and explore more about it
API update the user wiith emailid

Explore SchemaType options from from the documentation
add required,unique,minimum,lowercase,minlength,trim
Add default
create a custom validate function for gender 
improve db schema -put all appropriate validations on each field in schema 
Add timestamps for the schema

//API level validations on PATCH and Post(signup) request
//Data Sanitizing - Add API validation for each field 
(this is api level sanitiation before reaching into Db)
Install Validator(npm install Validator)
Explore validator functions and use validator functions for password, email,photourl

NEVER Trust req.body

validate data in req.body for put,patch,post(signup api)
create helper function-util for validations
install bcrypt pckage
create passwordHash using bcrypt and save the user in db with encrypted password
create login API
compare passwords and throw Error if passwords don't match 

AUTHENTICATION WORKS:

install cookieparser & 
send dummy cookie to user 
create GET profile API and check if you got the cookie back (res.cookie)
install jsonwebtoken
In login API,After email and password validation  create a JWT token and send it to user in cookie
read the cookie inside your profile API and find the logged in user 

add the userAuth middleware in profileAPI and a new SendconnectionRequest API
Set the expiry of JWT Token and cookies to 7d

create UserSchema method to get jwt
create userSchema method to comparepassword(passwordInuptbyuser)

Explore tinder APis
list out all existing apis you think wwe can add it in tinder
group multiple routes under respective routers
Read documentation for express.router
create route folders for auth ,profiles, connection request
Import the routes in app.js