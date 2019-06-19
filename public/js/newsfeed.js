(function($){

  function generateStar(canvas, ctx, starRadius){
			ctx.beginPath();
			ctx.arc(starRadius + (Math.random() * canvas.width), starRadius + (Math.random() * canvas.height), starRadius*Math.random(), 0, Math.PI*2, false);
      //ctx.arc(100, 30, starRadius, 0, Math.PI*2, false);

      var rand = Math.random();
      if(rand <= 0.5){
				  ctx.fillStyle = "rgba(255, 255, 255, 1)";
				  ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
				  ctx.shadowBlur = 3;
			}
			else if(rand > 0.75){
				  ctx.fillStyle = "rgba(255, 254, 196, 1)";
				  ctx.shadowColor = "rgba(255, 254, 196, 0.5)";
				  ctx.shadowBlur = 4;
			}
			else{
				  ctx.fillStyle = "rgba(192, 247, 255, 1)";
				  ctx.shadowColor = "rgba(192, 247, 255, 0.5)";
				  ctx.shadowBlur = 7;
			}
			ctx.fill();
	}

  $(function(){

		var canvas = document.getElementById("space");
		var context = canvas.getContext("2d");

    onresize = function(){
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    onresize();

    interval = setInterval(
      function(interval){
        generateStar(canvas, context, 3);
      }
      , 24);

          setTimeout( // Stop sreating stars after 20s
            function(){ clearInterval(interval); }
            ,20000
    );

	});
})(jQuery);


//Make sure the database connection works
var ref = firebase.database().ref();

let date = new Date();
let comment1 = [];
let active = "null";


/* change page elemts for user */
function data() {
  document.getElementById("logout").innerHTML = active;
}
/*see current data */
function sdata() {
  alert(
    "all stored data is" +
      "\n" +
      "current user is " +
      active +
      "\n" +
      "your password is " +
      cred[active]
  );
}

/* logout user */
function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      window.location = "login.html";
    })
    .catch(function(error) {
      // An error happened.
    });
}

//see post
function commSee() {}

//Make sure there's text in the text box
function validate(userId) {
        let x = document.getElementById("posting").value;
         if(x === "") {
           // IF there's nothing there
        alert("Please fill something in!");
              document.getElementById("posting").focus();
        }
         else {
           console.log(x);
           document.getElementById('comments').innerHTML = '';
            firebase.database().ref('posts/').push({
              author: "Anonymous",
              text: x

            });


}
}


//Submitting a search
function submitSearch () {
  alert("You have submitted a search.");
}



var starCountRef = firebase.database().ref('posts/');
starCountRef.on('value', function(snapshot) {
  console.log(snapshot.val());

  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    console.log(childData.author);
    console.log(childData.text);
    document.getElementById('comments').innerHTML += '<center><div><p>'+childData.author+': said "'+childData.text+'"</p><br></div></center>';
  });


});



// Upload Photo
function uploadPhoto () {
        var photourl = prompt("Submit a link to update your profile photo.");
    if (photourl == null || photourl == "") {
        txt = "Please provide a URL.";
    } else {
        alert("Working!");
        var img = document.getElementById("profileph");
            img.src = photourl;
    };
}
