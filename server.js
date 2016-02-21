var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    faceDetectFlag = false,
    text = '',
    text2 = '',
    $ = require('jquery');

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile('index.html');
});

// app.get('/facedetect',function(req,res){
//   res.json({
//     "faceDetectFlag": faceDetectFlag
//   });
// });
//
// app.post('/facedetect',function(req,res){
//   if (req.query.faceDetectFlag){
//     faceDetectFlag = req.query.faceDetectFlag;
//     res.json({"faceDetectFlag":faceDetectFlag});
//   } else {
//     res.json({"err":"failed, incorrect parameters"});
//   }
// });

app.get('/wholetext',function(req,res){
  res.json({
    "text":text
  });
});

app.get('/text',function(req,res){
  var length = text.split(" ").length;
  if (length > 8){
    var uniqueWords = [];
    $.each(text.split(" "), function(i, el){
        if($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
    });
    //take off first word
    text2 = text.split(" ").slice(length-8,length).join(" ");
  } else {
    text2 = text.split(" ").slice(0,length).join(" ");
  }
  res.json({
    "text":text2
  });
});

app.post('/text',function(req,res){
  if (req.body.text){
    text += req.body.text + ' ';
    var uniqueWords = [];
    $.each(text.split(" ").reverse(), function(i, el){
        if($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
    });
    uniqueWords.reverse();
    //
    //
    res.json({"text":text});
  } else {
    res.json({"err":"did not get any text"});
  }
});

app.listen(port, function () {
  console.log( "Listening on port " + port );
});
