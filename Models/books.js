var mongoose=require('mongoose');

//creating schema for books data
var bookSchema=mongoose.Schema({
"name":{
    type:String,
    required:true
},
"author":{
    type:String
},
"image-url":{
    type:String
},
"publisher":{
    type:String
},
"pages":{
        type:Number
    },
"isbn":{
    type:Number
},
"in-stock":{
    type:String
},
"price":{
    type:Number
},
"description":{
    type:String
}
});

//Exports books model
var Books=module.exports=mongoose.model('books',bookSchema);

//Get all books
module.exports.GetBooks=function(callback,limit){
    Books.find(callback).limit(limit);
};

//Get book by ID
module.exports.GetBookByID=function(id,callback){
    Books.find({isbn:id},callback);
};

//Add Books to database
module.exports.AddBooks=function(booksData,callback){
    Books.create(booksData,callback);
};

//Update the books details in database
module.exports.UpdateBookDetais=function(id,booksData,option,callback){
    var query={_id:id};
    var update={
        name:booksData.name,
        author:booksData.author,
        price:booksData.price
    };
    Books.findOneAndUpdate(query,update,option,callback);
}

//Deletes the book details in database
module.exports.DeleteBookDetails=function(id,callback){
    var query={isbn:id};
    Books.remove(query,callback);
}