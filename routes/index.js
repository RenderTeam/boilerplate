//Index
  exports.index = function ( req, res ) {
    res.render('index', { 
      controller: 'LoginController' 
    });
  };