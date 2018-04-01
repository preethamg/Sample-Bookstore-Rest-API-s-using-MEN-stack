var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var books=require('./Models/books');


//Connecting to MongoDB
mongoose.connect('mongodb://localhost/bookstore');

//var db=mongoose.connection;
app.use(bodyParser.json());

app.get('/',(req,res)=>{
res.send("Please navigate to /bookstore to access the bookstore data");
});


/*Get Requests to the database*/

//requesting bookstore page
app.get('/bookstore',function(req,res){
books.GetBooks(function(err,books){
    if(err){
        throw err;
    }
    res.json(books);
})
});

//requesting a particular book
app.get('/bookstore/:isbn',function(req,res){
    books.GetBookByID(req.params.isbn,function(err,books){
        if(err){
            throw err;
        }
        res.json(books);
    })
});


/*Post Requests to the database*/
app.post('/bookstore',function(req,res){
  var booksData=req.body;
  books.AddBooks(booksData,function(err,booksData){
      if(err){
          throw err;
      }
      res.json(booksData);
  })
});

/* Update request to the database*/
app.put('/bookstore/:id',function(req,res){
    var id=req.params.id;
    var booksData=req.body;
    books.UpdateBookDetais(id,booksData,function(err,booksData){
        if(err){
            throw err;
        }
        res.json(booksData);
    })
})

/*Deletes book records in database*/
app.delete('/bookstore/:isbn',function(req,res){
    var isbn=req.params.isbn;
    books.DeleteBookDetails(isbn,function(err,booksData){
        if(err){
            throw err;    
        }
        res.json(booksData);
    })
   console.log("successfully deleted the record");
})

//creating and hosting the server at port 3000
app.listen(3000);
console.log("Listening on port 3000");

