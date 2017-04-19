'use strict';

module.exports = function (app) {
     app.get('/', function (req,res){
        // Cookies that have not been signed
        console.log('Cookies: ', req.cookies)
        // Cookies that have been signed
        console.log('Signed Cookies: ', req.signedCookies)
        
        res.render('index.html')
     });

     app.get('/about', function(req,res) {
        res.render('about.html');
    });
}
