const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const alertaContenedor = document.querySelector('#alertaContenedor');
let datos = {};

//QUITAR EL SPINNER CUANDO EL DOCUMENTO ESTE LISTO
window.onload = function() {
  const spinner = document.querySelector('.contenedor-spinner');
  spinner.style.opacity= 0;
  spinner.style.visibility="hidden";
  spinner.style.transition = "all 1s ease-in-out";
  
  if ('loading' in HTMLImageElement.prototype) {
      agregarLazyLoading();
  }else{

  }

  formulario.addEventListener('submit', validarDatos);
  nombre.addEventListener('input', agregarDato);
  email.addEventListener('input', agregarDato);
  mensaje.addEventListener('input', agregarDato);
};

function validarDatos(e) {
  e.preventDefault();

  limpiarAlertaHTML();
  
  const llaves = Object.keys(datos);
  const valores = Object.values(datos);
  const val = valores.some( v => v === "");

  if (llaves.length < 3 || val ) {
    alerta('danger', 'Algún campo esta vacío');
    return;
  }
  
  alerta('success', 'enviando...');
    setTimeout(() => {
      alerta('success', 'exito al enviar');
      formulario.reset();
      datos = {};
    }, 2000);
}

function agregarDato(e) {
   datos = {
         ...datos,
    [e.target.name] : e.target.value.trim()
   }
}

function alerta(tipo, mensajeAlerta) {
  const p = document.createElement('p');
  p.textContent = mensajeAlerta;
  p.classList.add('alerta', `${tipo}`);
  alertaContenedor.appendChild(p);

  setTimeout(() => {
    p.remove();
  },2000);
}

function limpiarAlertaHTML() {
  while(alertaContenedor.firstChild) {
    alertaContenedor.removeChild(alertaContenedor.firstChild);
  }
}

function agregarLazyLoading() {
  const imagenes = document.querySelectorAll('img.lazy-load');
  imagenes.forEach(img => {
    img.setAttribute('loading','lazy');
  });
}