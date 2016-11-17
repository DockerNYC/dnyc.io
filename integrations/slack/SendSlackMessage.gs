function SendSlackMessage(e){
  // Only include form values that are not blank
  // Do not put secrets into this file!
  var user_info="";
  for (var key in e.namedValues) {
    var val = e.namedValues[key][0].toString();
    if (val !== "") {
      user_info += key + ': ' + val + '\n';
    }
  }
  var url = "https://slack.com/api/chat.postMessage";
  var payload =
  {
    "token" : "<TOKEN_GOES_HERE>",
    "as_user" :"true",
    "text" : "New response received:\n" + user_info,
    "channel" : "<CHANNEL_GOES_HERE>", // or whatever
    "type" : "post",
  };
  var options =
  {
    "method" : "POST",
    "payload" : payload,
    "followRedirects" : false,
    "muteHttpExceptions": true
  };

  //Hit the Slack API with the request
  var result = UrlFetchApp.fetch(url, options);

  //Check the request went through and log errors if necessary
  if (result.getResponseCode() == 200) {
   var params = JSON.parse(result.getContentText());
   Logger.log(params);
  }
}

