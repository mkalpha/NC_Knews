## Package.json - dont need test and seed its already being done in your spec file
General 
Sort out all the eslint errors
Use more object desctructuring
Write a readme
## Get rid of output files and query sql files
Get rid of original instructions and folder structure files

Migrations & Seeding

## User avatar?
UTILS: FOR EACH NO!!!!  So much mutation 
## Nested then in seed
idReference: what is that actually returning? Naming matters here
Map , reduce
Knex timestamp argument can just use new date (!)   
Does user data being seeded depend on topic datat being seeded?
Routing
Should use .route method
Controllers
Make sure to send all your data in objects - topics-  and with reasonable names like article rather than returned article
Make sure if you’re getting 1 thing it’s destructured off the array e.g. getUser -> change conditions for checking if none
Make information off body / params labelled exactly what it is e.g. sendArticle - article is not an article but an article id
Be consistent with your query terms 
Articles
All articles currently doesn’t deal very well with bad queries: if no articles are returned you check for a user? And then don’t send anything back to the client -> ultimately you would want to send a 404 if the topic doesnt exist BUT an empty array if its a real topic but has no articles
When you destructure on articleById you’ll have to change your condition to figure out if you’ve been returned an article
Need to return body on fetchsinglearticle -> and test that the article returned has all the expected keys
Change article should be status 200
Delete by nonexistent (100)AND  invalid (‘banana’) article id should 404 currently 204s
Good error handling for no body on patch article route but can you change it so its 200 and sends back the article unmodified - it has implications 
getComments suddenly uses order rather than the rest of your fns which use order by
get Comments make sure to differentiate between nonexistent (100) and bad (‘banana’) articleids -> 404 and 400 respectively
Add comment - non existent article id should be 404 not 422
Be consistent about where you set up your defaults -> in your controllers or in your models e.g. patchArticles
    Comments
Patch comments should be 200 not 201 and return updated comment
Patch comments - if no body should return 200 and unmodified comment (as with your patch article)
If invalid inc votes on patch comment should have 200 and return unmodified (or can argue 400 as with your other endpoints)
Need to 404 on patch and delete if commend_id is non-existent (but valid)
    Users
Make sure to destructure user and change your condition appropriately
Models
Get rid of stray console.log
Dont want a catch in your models anyway
You only need to return * if you’re inputing / deleting -> your gets already get what you want
Error Handling
Handle 405s -> use router.all
Would have been nice if your queries had matched the readme exactly (order rather than orderby )
Only time you should use 422 unprocessable is if you’re posting a user that already exists or posting a comment with a valid but non existent username
## Be consistenr and use promise.reject when making tailored error messages not calling next directly
Extract error functions into error folder
Edit down error messages in controller, ,let error functions do the writing
You’ll want to have a last error block for 500s rather than relying on express
Tests
GET Bad queries author is in the database but no comments & GET Bad queries aurhor is not in the database-> these tests are checking a bad article or article that has no comments nothing to do with the author (378. 384)
Article by a bad topic
Lovely testing of your utils -> descriptions could be shorter
Eql overload