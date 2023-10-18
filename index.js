console.log("hello");

let cats = {
    "data": [
        {
         key: "brownsugar",
         name: "Brown Sugar",
         photo: "Assets/brownsugar.jpg" ,
         favorite: false
        },
        {
        key: "ddooda",
        name: "Ddo O Da",
        photo: "Assets/ddooda.jpg",
        favorite: false
        },
        {
        key: "heek",
        name: "Heek",
        photo: "Assets/heek.jpg",
        favorite: true
        },
        {
        key: "meoru",
        name: "Meoru",
        photo: "Assets/meoru.jpg",
        favorite: true
        },
        {
        key: "salem",
        name: "Salem",
        photo: "Assets/salem.jpg",
        favorite: false
        },
        {
        key: "soonmoo",
        name: "Soonmoo",
        photo: "Assets/soonmoo.jpg",
        favorite: true
        },
        {
        key: "timmy",
        name: "Timmy",
        photo: "Assets/timmy.jpg" ,
        favorite: true
        },
        {
        key: "waffle",
        name: "Waffle",
        photo: "Assets/waffle.jpg" ,
        favorite: false
        },
    ]
}

//Require Express
let express = require('express');

//Initialize object app
let app = express();

// app.get('/',(request, response)=> {
//     response.send("This is the main page.")
// });

app.use('/',express.static('Public')); //execute express.static when user asks for / page

app.get('/cats',(request, response) => {
    // response.send('These are all the cats')
    response.json(cats);
});

app.get('/cats/:cat',(request, response) => {
    // response.send('These are my favorite cats')
    // console.log(request.params); //console logs data { cat: 'soonmoo' }
    // console.log(request.params.cat); //console logs string: soonmoo
    
    let user_cat = request.params.cat; //store string in variable
    let user_obj; //contain info you want to send back to user

    // console.log(user_cat);

    for (let i=0; i<cats.data.length; i++) {
        if(user_cat == cats.data[i].key) { //if string matches data.name
            user_obj = cats.data[i];
        }
    }
    console.log(user_obj);
    if (user_obj) {
        response.json(user_obj);
    } else {
        response.json({status: "not found"});
    }
});

app.get('/favorite',(request, response) => {
    // response.send('These are my favorite cats');

    //#Source ChatGPT
    let favoriteCats = []; //create array
    for (let i = 0; i<cats.data.length;i++) {
        if (cats.data[i].favorite === true) {   //if favorite = true
            favoriteCats.push(cats.data[i]);    //add to favoriteCats array
        }
    }

    if (favoriteCats.length > 0) {
        response.json(favoriteCats); //send data in favoriteCats array
    } else {
        response.json({ status: "No favorite cats found" });
    }
});

app.listen(3000, () => {
    console.log('App is listening at localhost:3000')
});