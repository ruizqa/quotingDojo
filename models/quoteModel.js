const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    name: {type: String, required:true},
    quote: {type: String, required:true},
    date:{type:Date}
   })

const Quote = mongoose.model('Quote', QuoteSchema);

const quoteModel={
    createQuote: function(newQuote){
        return Quote.create(newQuote)
    },
    findAll:function(){
        return Quote.find()
    }

}

module.exports = {quoteModel}