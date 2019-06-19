//Make sure the database connection works
var ref = firebase.database().ref();
alert(ref);

//When the user logs in
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    //Go to profile page
    window.location = "newsfeed.html";
  } else {
    //No user signed in
  }
});

function signUp() {
  let user = {
    email: "",
    password: "",
    conPassword: ""
  };

  user.email = document.getElementById("signUpForm").elements.item(0).value;
  user.password = document.getElementById("signUpForm").elements.item(1).value;
  user.conPassword = document
    .getElementById("signUpForm")
    .elements.item(2).value;

  let n = user.password.length;

  if (n == 0) {
    alert("Please complete the form.");
  } else if (n < 6) {
    alert("Password is too short.");
  } else {
    if (user.password === user.conPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      alert("Added.");
    } else {
      alert("Passwords do not match.");
    }
  }
}
