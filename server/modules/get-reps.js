var bookshelf = require('../../db/pg-db-config');

// Retrieve a location's legislative representatives

module.exports = function(zip, res, callback) {
  // This (▽) is not pretty. There is a better way to write it. Bookshelf is difficult. Call it a first draft.
  var repLookup = 'select bioguide_id, firstname, lastname, title, Zips.district, party from Legislators, Zips where Zips.zipcode = ' + zip + ' and Legislators.in_office = \'1\' and Legislators.state = Zips.state and (Legislators.district = Zips.district or length(Legislators.district) > 2)';
  bookshelf.knex.raw(repLookup)
    .then(function(data, err) {
      if (err) {
        console.log('There was a problem with that request.');
        res.sendStatus(500).send('There was a problem with that request.');
      } else {
        var dupCheck = [];

        var obj = {
          reps: [ ],
        };

        // ITERATE over results rows
        for(var i = 0; i < data.rows.length; i++){
          var row = data.rows[i];

          // IF rep NOT in dupCheck array
          if (dupCheck.indexOf(row.bioguide_id) < 0) {
            dupCheck.push(row.bioguide_id);

            // CREATE new rep object
            var rep = {
              bioguide_id: row.bioguide_id,
              name: (row.nickname || row.firstname)  + " " + row.lastname,
              title: (row.title === "Sen" ?  "Senator" : "Representative"),
              district: row.district,
            };

            // CHECK AND MUTATE party affiliation
            if(row.party === "R"){
              rep.affiliation = "Republican";
            }
            else if (row.party === "D") {
              rep.affiliation = "Democrat";
            }
            else{
              row.affiliation = "Nonpartisan";
            }

            obj.reps.push(rep);
          }
        }

        callback(obj);
      }
    });
};
