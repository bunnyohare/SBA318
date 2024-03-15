Free content info: 
Text: Lipsum, a Lorem Ipsum text generator. https://www.lipsum.com/
JSON Data: {JSON} Placeholder, Free fake and reliable API for testing and prototyping. https://jsonplaceholder.typicode.com/
Color palette: https://coolors.co/palette/cad2c5-84a98c-52796f-354f52-2f3e46

index.html only allows posts to be displayed to the user if they put in a postId number in the box.

http://localhost:5005/api/user/ 

Testing of .post for a new user can be done using a body in this format:

{"name": "Morris",
"username": "TheCatMorris",
"email": "cat@feline.com"}


http://localhost:5005/api/post/

Testing of .post for a new post can be done using a body in this format:

{"userId": "3",
"title": "Bowties are cool!",
"content": "It's bigger on the inside."}

http://localhost:5005/api/comment/

Testing of .post for a new comment can be done using a body in this format:

{"postId": "3",
"name": "BuffyBot was so creepy.",
"email": "dawn@sunnydale.com",
"body": "That'll put marzipan in your pie plate, bingo! Really? "}

The code doesn't test to see if a user exists before they leave a comment, nor does it test to see if a post exists before it creates a comment with a given postId.