var express = require("express");
var router = express.Router();
const xml2js = require("xml2js");
const fs = require("fs");

// read XML from a file
const xml = fs.readFileSync("./timezones.xml");

// convert XML to JSON file
(async () => {
  try {
    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
    const timezones = result.TimeZones.TimeZone;
    const restructedTimeZones = [];

    for (let i = 0; i < timezones.length; i++) {
      let currentTimeZone = timezones[i];
      currentTimeZone.Name[0] = currentTimeZone.Name[0].slice(
        0,
        currentTimeZone.Name[0].length - 10
      );
      currentTimeZone.Name = currentTimeZone.Name[0].split(",");
      const filteredResult = currentTimeZone.Name.filter(
        (word) => word.length > 0
      );

      for (let j = 0; j < filteredResult.length; j++) {
        let gmt;
        let hoursAndMins ;
        if(currentTimeZone.Mins > 0){
          hoursAndMins = currentTimeZone.Hours.concat(currentTimeZone.Mins).join(':')
        }else{
          hoursAndMins = currentTimeZone.Hours
        }

        if(currentTimeZone.Hours >= 0){
          gmt = 'GMT' + '+' + hoursAndMins
        }else{
          gmt = 'GMT' + hoursAndMins
        }
        
        let obj = {
          id: [i] + [j],
          name: filteredResult[j],
          gmt: gmt,
          hours: currentTimeZone.Hours,
          mins: currentTimeZone.Mins,
        };

        restructedTimeZones.push(obj);
      }
    }

    restructedTimeZones.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const json = JSON.stringify(restructedTimeZones);

    // save JSON in a file
    fs.writeFileSync("timezone.json", json);
  } catch (err) {
    console.log(err);
  }
})();

/* GET SERVER */
router.get("/", function (req, res, next) {
  res.render("index", {title:'Univers lab server'});
});

module.exports = router;
