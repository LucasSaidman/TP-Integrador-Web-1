function validarFormulario(event) {
  event.preventDefault(); 
  
  // Limpiar errores anteriores
  const erroresAnteriores = document.querySelectorAll('.error-message');
  erroresAnteriores.forEach(error => error.remove());
  
  // Limpiar mensaje de éxito anterior
  const mensajeExito = document.querySelector('.success-message');
  if (mensajeExito) mensajeExito.remove();
  
  // Obtener valores
  const nombre = document.getElementById('nombre').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  
  let hayErrores = false;
 
  // Validar nombre
  if (nombre === '') {
    mostrarError('nombre', 'El nombre es necesario');
    hayErrores = true;
  } else if (nombre.length < 3) {
    mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres');
    hayErrores = true;
  } else if (!isNaN(nombre)) {
    mostrarError('nombre', 'El nombre no puede ser solo números');
    hayErrores = true;
  }
  
  // Validar teléfono (opcional pero si hay valor, validarlo)
  if (phone !== '' && !phoneRegex.test(phone)) {
    mostrarError('phone', 'El teléfono debe tener 10 dígitos');
    hayErrores = true;
  }
  
  // Validar email
  if (email === '') {
    mostrarError('email', 'El correo electrónico es necesario');
    hayErrores = true;
  } else if (!emailRegex.test(email)) {
    mostrarError('email', 'El formato del correo electrónico no es válido');
    hayErrores = true;
  }
  
  // Validar mensaje
  if (message === '') {
    mostrarError('message', 'El mensaje es necesario');
    hayErrores = true;
  } else if (message.length < 10) {
    mostrarError('message', 'El mensaje debe tener al menos 10 caracteres');
    hayErrores = true;
  }
  
  // Si no hay errores, mostrar éxito
  if (!hayErrores) {
    const form = document.querySelector('form');
    const carta = document.createElement('div');
    carta.className = 'success-message';
    carta.innerHTML = `<p>¡Mensaje enviado correctamente! Nos contactaremos a ${email}</p>`;
    carta.style.color = 'green';
    carta.style.padding = '15px';
    carta.style.marginTop = '20px';
    carta.style.borderRadius = '8px';
    carta.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
    form.insertAdjacentElement('afterend', carta);
    
    // Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  }

  return false;
}

function mostrarError(campoId, mensaje) {
  const campo = document.getElementById(campoId);
  const errorSpan = document.createElement('span');
  errorSpan.className = 'error-message';
  errorSpan.textContent = mensaje;
  errorSpan.style.color = 'red';
  errorSpan.style.fontSize = '0.9rem';
  errorSpan.style.display = 'block';
  errorSpan.style.marginTop = '5px';
  campo.parentElement.appendChild(errorSpan);
}