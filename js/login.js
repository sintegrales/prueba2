var db = firebase.firestore();

function login() {
	
	var email = document.getElementById('email').value;
	var clave = document.getElementById('clave').value;
	
	console.log(email + ' - ' + clave);
	
	firebase.auth().signInWithEmailAndPassword(email, clave)
	  .then((userCredential) => {
	    // Signed in
	    var user = userCredential.user;
	    sessionStorage.setItem("uid", user.uid);
	    //localStorage.setItem("uid", user.uid);
	    window.location.href = "dashboard.html";
	    console.log(user.uid);
	    // ...
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log(error);
	  });
	
}
