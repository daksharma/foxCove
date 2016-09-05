module.exports = function(res, req){
  // govTrack.findVoteVoter({id: 31425718}, function(err, data){
  //     console.log("VOTE DATA:", data)
  //     res.send(data)
  // })
  govTrack.findPerson("P000523", function(err, data) {
      // console.log(data);
      res.send(data);
  });
  // civicInfo.elections(function(error, data) {
  // console.log('whatever');
  // // res.send(JSON.stringify(data))
  // });
//   civicInfo.voterInfo({electionID: '4000', address: '1500 Market Street, Philadelphia, PA'}, function(data) {
// console.log(data);
// });
};
