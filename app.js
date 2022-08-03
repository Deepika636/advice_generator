const express=require("express");
const https=require("https");
const app=express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(req,res){
  const url="https://api.adviceslip.com/advice";
  https.get(url,function(response){
    response.on("data",function(data){
      const advice_id=JSON.parse(data).slip.id;
      const advice=JSON.parse(data).slip.advice;
      res.render("index",{Advice_ID:advice_id, Advice:advice});
    });
  });

});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is up and running! :)");
});
