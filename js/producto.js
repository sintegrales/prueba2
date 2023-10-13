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

//---------agregar producto

function agregar() {
	var nombrep = document.getElementById('nombre').value;
	var marcap = document.getElementById('marca').value;
	var preciop = parseFloat(document.getElementById('precio').value);
	var stockp = parseFloat(document.getElementById('stock').value);
	var proveedorp = document.getElementById('proveedor').value;
	
	db.collection("producto").add({
    nombre: nombrep,
    marca: marcap,
    precio: preciop,
    stock: stockp,
    proveedor: proveedorp
	})
	.then((docRef) => {
		 alert('El producto se guardo correctamente');
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
		alert('Error');
	    console.error("Error adding document: ", error);
	});
	
	document.getElementById('form').style.display = "none";
	document.getElementById('visualizar').style.display = "block";
	
	document.getElementById('nombre').value = "";
	document.getElementById('marca').value ="";
	document.getElementById('precio').value = "";
	document.getElementById('stock').value = "";
	document.getElementById('proveedor').value = "";
}
//---------leerproductos	
	
function leerproducto() {	
	
	
	//---------consulta a la colección
		db.collection("producto")
				.onSnapshot((querySnapshot) => {
					document.getElementById('conproducto').innerHTML = "";
	    			querySnapshot.forEach((doc) => {
	    				//---------muestra la consulta
	        			//console.log(`${doc.id} => ${doc.data()}`);
	        			//console.log(`Nombre => ${doc.data().nombre}`);
						document.getElementById("conproducto").innerHTML += `
							<tr>
								<td>${doc.data().nombre}</td>
								<td>${doc.data().marca}</td>
								<td>${doc.data().proveedor}</td>
								<td>${doc.data().precio}</td>
								<td>${doc.data().stock}</td>
								<td>
									<span class="fas fa-edit" id="iconed" title="Editar" onclick="llenar_form('${doc.id}', '${doc.data().nombre}', '${doc.data().marca}', '${doc.data().precio}', '${doc.data().stock}', '${doc.data().proveedor}')"></span>
									<span class="fas fa-trash-alt" id="iconbo" title="Elminar" onclick="pregunta_el('${doc.id}')"></span>								
								</td>
							</tr>
						
						`;	        			
	        			
	    			});
	});	
}

leerproducto();
	
	
	
//eliminar productos	

function pregunta_el(pid) {
	//console.log(pid);
	if(confirm("Esta seguro de eliminar el registro")){
		eliminar(pid);	
	}else {
		console.log("no se borro");
	}
}
	
function eliminar(pid) {
	
	db.collection("producto").doc(pid).delete().then(() => {
		 alert("Se ha eliminado el producto");	    
	    //console.log("Document successfully deleted!");
	}).catch((error) => {
		 alert("error");
	    console.error("Error removing document: ", error);
	});
}	

//---------editar registro

function llenar_form(pid, nombre, marca, precio, stock, proveedor) {
	document.getElementById('pid').value = pid;	
	document.getElementById('nombre').value = nombre;
	document.getElementById('marca').value = marca;
	document.getElementById('precio').value = precio;
	document.getElementById('stock').value = stock;
	document.getElementById('proveedor').value = proveedor;
	mostrar('ver');
	document.getElementById('botong').style.display = "none";
	document.getElementById('botone').style.display = "block";
}


function editar() {
	var pid = document.getElementById('pid').value;
	var nombrep = document.getElementById('nombre').value;
	var marcap = document.getElementById('marca').value;
	var preciop = parseFloat(document.getElementById('precio').value);
	var stockp = parseFloat(document.getElementById('stock').value);
	var proveedorp = document.getElementById('proveedor').value;
	
	var productoRef = db.collection("producto").doc(pid);
			
			// Set the "capital" field of the city 'DC'
			return productoRef.update({
			    nombre: nombrep,
			    marca: marcap,
			    precio: preciop,
			    stock: stockp,
			    proveedor: proveedorp
			})
			.then(function() {
			    console.log("Document successfully updated!");
				   document.getElementById('visualizar').style.display = "block";
	
					document.getElementById('nombre').value = "";
					document.getElementById('marca').value ="";
					document.getElementById('precio').value = "";
					document.getElementById('stock').value = "";
					document.getElementById('proveedor').value = "";
				   mostrar('ocultar');  
			})
			.catch(function(error) {
			    // The document probably doesn't exist.
			    alert("error");
			    console.error("Error updating document: ", error);
			});
			
}











