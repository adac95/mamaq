// Validacion de inputs del form

export default function inputValidation() {
    const $clientesInput = document.getElementById('clientes');
    $clientesInput.min = 0
    $clientesInput.max = 10
}
  