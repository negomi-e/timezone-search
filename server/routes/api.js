var express = require('express');
var router = express.Router();
var jsonFile = require('../timezone.json')

/* GET first three alphabetical listings */

router.get('/', function(req, res, next) {
  let items = jsonFile.slice(0, 3)
  res.send({
    success: true,
    timezones: items
  })
});

/* GET specific listing */
router.get('/:location', async function(req, res, next) {
  try{
    const {location} = req.params;
    let regex = new RegExp(location, 'i')
    let items = jsonFile.filter(item=> item.name.match(regex))
    let result = items.slice(0,3)
    let error = false;
    let success = true;
    if(result.length< 0){
      error = 'There is no timezone data available';
      success = false;
    }
    res.json({
      success: success,
      timezones: result,
      error: error
    })
  }catch (err) {
    res.json(err.message)
  }
  
});

module.exports = router;
