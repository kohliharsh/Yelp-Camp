const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const Camps = require("./models/campgrounds")
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",express.static(__dirname));


mongoose.connect("mongodb://localhost:27017/yelpcampDB", { useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.set("useCreateIndex",true);
const camp1 = new Camps({
    title: "FIRST",
    image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507441722f7dd39348c2_340.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
});
const camp2 = new Camps({
    title: "SECOND",
    image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507441722f7dd39348c2_340.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"


});
const camp3 = new Camps({
    title: "THIRD",
    image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507441722f7dd39348c2_340.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"

});

const defaultCamps = [camp1,camp2,camp3];

app.get("/",function(req,res){
    res.render("landing");
})

app.get("/campgrounds",function(req,res){
   
    Camps.find({},function(err,foundCamp){
        if(!err)
        {
            if(foundCamp.length === 0)
            {
                Camps.insertMany(defaultCamps,function(err){
                    if(!err)
                    {
                        console.log("default items inserted!")
                    }
                    res.render("campgrounds",{campgrounds:foundCamp});
                });
            }
            else{
                res.render("campgrounds",{campgrounds:foundCamp});
            }
        }
    })
})


app.get("/campgrounds/new",function(req,res){

    res.render("newcamps")
})

app.post("/campgrounds/new",function(req,res){
    const camp = new Camps ({
        title:req.body.title,
        image:req.body.image,
        description:req.body.description
    });
    camp.save();
    defaultCamps.push(camp);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/:id",function(req,res){
   
        Camps.findOne({title:req.params.id},function(err,found){
            if(!err)
            {
                if(found)
                {
                res.render("show",{campgrounds:found});
                }
            }
            else{
                console.log(err);
            }
        })
    
})

app.post("/campgrounds/:id",function(req,res){
    var com = req.body.comment;
    var ide = req.params.id;
        Camps.findOne({title:req.params.id},function(err,foundcamp){
        if(!err)
        {
            if(foundcamp)
            {
                foundcamp.comment.push(com);
                foundcamp.save();
                res.redirect("/campgrounds/" + req.params.id);
            }
            
        }
        //else{
          //  console.log(err);
        //}
    })
      
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server Started!");
})