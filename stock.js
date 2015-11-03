var request = require('request');
var util = require('util');

/**
 * Gets stock information about a given stock ticker
 * @param ticker The stock ticker to gather information about
 */
function getQuote(ticker, callback) {
    var url = util.format('http://www.google.com/finance/info?q=%s', ticker);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // For some reason the Google finance API returns '// ' in front of all of their responses. Maybe their way of 'deprecating'?
          var stockObject = JSON.parse(body.substring(3));
          var quote = {};
          quote.ticker = stockObject[0].t;
          quote.price = stockObject[0].l_cur;
          quote.change = stockObject[0].c;
          quote.change_percent = stockObject[0].cp;
          quote.last_trade_time = stockObject[0].lt;
          callback(null, quote);
      }
      else{
          callback(error, null);
      }
    });
}
