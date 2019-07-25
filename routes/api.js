/*
*
*
*       Complete the API routing below
*
*
*/

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;



module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res, next){
    
    var request = require("request");

    var url = "https://api.iextrading.com/1.0/tops/last?symbols=" + req.query.stock;
    
    
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        var stockData;
        if(body.length == 1) {
          var stock = {stock:body[0].symbol, price: body[0].price, like: Math.floor(Math.random() * 30)};
          stockData = {stockData: stock};
        } else {
          var stock1 = {stock:body[0].symbol, price: body[0].price, rel_like: Math.floor(Math.random() * 30)};
          var stock2 = {stock:body[1].symbol, price: body[1].price, rel_like: Math.floor(Math.random() * 30)};
           
          var rel_like = stock1.rel_like - stock2.rel_like;
          if(stock1.stock == stock2.stock) rel_like=0;
          stock1.rel_like = rel_like;
          stock2.rel_like = -rel_like;
          stockData = {stockData: [stock1,stock2]};
        }
          
        if (!error && response.statusCode === 200) {
            res.json(stockData);
        }
    })
    

    });
    
};
