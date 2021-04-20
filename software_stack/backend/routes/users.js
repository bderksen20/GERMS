var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', (req, res) => {
  //res.send('respond with a resource');

  // added for test
  /*
  res.json([{
    id: 1,
    username: "bderksen20"
  }, {
    id: 2,
    username: "seniordesignuser"
  }]);
  */
  res.send('POST request to the homepage')

});

module.exports = router;
