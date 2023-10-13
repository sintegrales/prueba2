var db = firebase.firestore();

//-------monstrar formulario

function mostrar(dato) {
	switch(dato) {
		case "ver":
			document.getElementById('form').style.display = "block";
			document.getElementById('visualizar').style.display = "none";
			break;
		case "ocultar":
			document.getElementById('form').style.display = "none";
			document.getElementById('visualizar').style.display = "block";
			document.getElementById('botong').style.display = "block";
			document.getElementById('botone').style.display = "none";
			break;
	}
}

//------------agregar un nuevo usuario
function agregar() {
	var nombreu = document.getElementById('nombre').value;
	var emailu = document.getElementById('email').value;
	var claveu = document.getElementById('clave').value;
	var telefonou = document.getElementById('telefono').value;
	var rolu = document.getElementById('rol').value;
	var uid = "";
	
	firebase.auth().createUserWithEmailAndPassword(emailu, claveu)
	  .then((userCredential) => {
	    // Signed in
	    var user = userCredential.user;
	    uid = user.uid;	
	     //----------crear usuario BD
	     
	     db.collection("usuario").doc(uid).set({
			    id: uid,		    
			    nombre: nombreu,
			    email: emailu,
			    telefono: telefonou,
			    rol: rolu
			})
			.then(() => {
			    console.log("Document successfully written!");
			})
			.catch((error) => {
			    console.error("Error writing document: ", error);
			});
	  
		  /*db.collection("usuario").add({
				 id: uid,		    
			    nombre: nombreu,
			    email: emailu,
			    telefono: telefonou,
			    rol: rolu
				})
				.then((docRef) => {
					 alert('El usuario se guardo correctamente');
				    console.log("Document written with ID: ", docRef.id);
				})
				.catch((error) => {
					alert('Error guardar base de datos');
				    console.error("Error adding document: ", error);
				});*/
				
				document.getElementById('form').style.display = "none";
				document.getElementById('visualizar').style.display = "block";
				
				document.getElementById('nombre').value = "";
				document.getElementById('email').value ="";
				document.getElementById('clave').value = "";
				document.getElementById('telefono').value = "";
				document.getElementById('rol').value = "";
	    // ...
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    alert("error creación usuario");
	    // ..
	  });
	  
	 
	
	
}












