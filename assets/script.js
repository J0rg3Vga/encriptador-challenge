
var munieco = document.querySelector(".img__munieco");
var text_1 = document.getElementById("text_1");
var text_2 = document.getElementById("text_2");
var text_result = document.querySelector(".text__result");
var container_result = document.querySelectorAll(".ocultar");

//// encriptarBtn() Y desencriptarBtn() 
function encriptarBtn() {   
	// ocultamos el muñeco y párrafos
	hidden()
	var input = document.getElementById("container__text").value;

	//encriptamos el texto
	var output = encriptar(input);
	text_result.textContent = output;

	document.getElementById("container__text").value = "";
	const copyButton = document.getElementById("btn__copy");
	copyButton.innerText = "Copiar";
}

function desencriptarBtn() {
	hidden()
	var input = document.getElementById("container__text").value;
	var output = desencriptar(input);
	text_result.textContent = output;

	document.getElementById("container__text").value = "";
	const copyButton = document.getElementById("btn__copy");
	copyButton.innerText = "Copiar";

}

//// encriptar(text) Y desencriptar(text)
function encriptar(text) {
	let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
	for (let i = 0; i < matrizCodigo.length; i++) {
		if (text.includes(matrizCodigo[i][0])) {
			text = text.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
		}
	}
	return text
}

function desencriptar(text) {
	let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
	for (let i = 0; i < matrizCodigo.length; i++) {
		if (text.includes(matrizCodigo[i][1])) {
			text = text.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
		}

	}
	return text
}

/* 
	La función hidden() se encarga de ocultar elementos del DOM agregando o quitando clases CSS a través del método classList.add(). 
	>>La propiedad de sólo lectura Element.classList devuelve una colección activa de DOMTokenList de los atributos de clase del elemento.
	>>Se agrega classList "ocultar" a los elementos munieco, text_1 y text_2.
	>>La classList "activate" a los elementos container_result[0] y container_result[1]. 
	>>También se está agregando la classList "container__result" al elemento text_result.
	
*/

function hidden() {
	munieco.classList.add("ocultar");
	text_1.classList.add("ocultar");
	text_2.classList.add("ocultar");
	container_result[0].classList.add("activate");
	container_result[1].classList.add("activate");
	text_result.classList.add("container__result")

}

/* 
	Permite copiar el contenido de un elemento de texto específico al portapapeles cuando se hace clic en un botón
	>>selecciona el contenido de un elemento con la clase "text__result" a través del método textContent
	>>lo copia al portapapeles utilizando navigator.clipboard.writeText()
	>>muestra una alerta con el contenido copiado.
*/

const btnCopy = document.getElementById('btn__copy');
btnCopy.addEventListener('click', copiar = () => {
	navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
		if (result.state === "granted" || result.state === "prompt") {
			// Seleccionar el texto o contenido que deseas copiar
			var content = document.querySelector('.text__result').textContent;

			// Crear un elemento temporal (input) para almacenar el contenido
			const tempInput = document.createElement("input");
			tempInput.value = content;

			// Agregar el elemento temporal al documento
			document.body.appendChild(tempInput);

			// Seleccionar y copiar el contenido del elemento temporal
			tempInput.select();
			navigator.clipboard.writeText(tempInput.value).then(() => {
			// Operación de copiado exitosa
			}).catch((error) => {
				console.error('Error al copiar el contenido: ', error);
			});

			// Remover el elemento temporal del documento
			document.body.removeChild(tempInput);

			// Cambiar el texto del botón después de copiar
			const copyButton = document.getElementById("btn__copy");
			copyButton.innerText = "¡Copiado!";
			
		}
	});


});

