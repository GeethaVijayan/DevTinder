Dev Tinder API List

authRouter
Post /login API
POst /logout API
Post /Signin API

profile Router
PATCH /profile/edit  Profile
Get /Profile/view   API (viewing profile details)
patch/profile/password (forgotting password and adding new)   --//forgot password

ConnectionRequestRouter
Tinder API
post /request/send/interested/:userID;   (like the profile -send the request)
post /request/send/ignore/:userID;   (ignore/pass the profile -send the request)
==>we merged this 2 request and made it as 1
status as dynamic [interested,ignore]
/request/send/status/:userID; 


receive the api (accepting or reject)
post /request/review/accepted/:requestedID;
post /request/review/rejected/:requestedID;

==>single api post /request/review/:status/:requestedID;
status[accepted,rejected]



UserConnectionRequestRouter
/get/user/requests/received  -API (to see what are all request i have in my porifle (waiting to accept /review))
/Get/user/connection -   (what are all the matches i have)

/GEt/user/feed API (which shows initial load of users)-gets you the user profiles on other platform


frst we need to find all conne




status
ignore   -dislike(user ignore the profile)
interested, -(user like the profile)
Accepted   - both side it got accepted
Rejected


(This is small aplication so we are able to handle but for large apps we have so maany apis like 100)
we cannot all 100/13 apis in a single file , we need to pass it router
we create EXpress.Router and we need to handle routing in a proper way


we create router (group them for siliar apis)

(rightnow we added all routes in app.js it is messed up to organize we need to offload to seperate src file)
