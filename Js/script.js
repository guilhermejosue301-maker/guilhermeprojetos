document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastro-form');

    // Executa apenas se o formulário existir na página atual
    if (form) {
        form.addEventListener('submit', function(event) {
            // Impede o envio padrão do formulário
            event.preventDefault(); 
            
            // Limpa mensagens de erro antigas
            clearErrors();

            // Valida os campos
            const isNomeValid = validateRequired(document.getElementById('nome'), 'O nome completo é obrigatório.');
            const isEmailValid = validateEmail(document.getElementById('email'));
            const isMensagemValid = validateRequired(document.getElementById('mensagem'), 'Por favor, escreva uma mensagem.');

            // Se todos os campos forem válidos, exibe a mensagem de sucesso
            if (isNomeValid && isEmailValid && isMensagemValid) {
                const formSection = document.querySelector('.form-section');
                const successMessage = document.getElementById('success-message');

                form.classList.add('hidden'); // Esconde o formulário
                successMessage.classList.remove('hidden'); // Mostra a mensagem de sucesso
            }
        });
    }

    // Função para validar campos obrigatórios
    function validateRequired(field, message) {
        if (!field.value.trim()) {
            showError(field, message);
            return false;
        }
        return true;
    }

    // Função para validar o formato do e-mail
    function validateEmail(field) {
        if (!validateRequired(field, 'O e-mail é obrigatório.')) {
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            showError(field, 'Por favor, insira um e-mail válido.');
            return false;
        }
        return true;
    }

    // Função para exibir uma mensagem de erro
    function showError(field, message) {
        field.classList.add('error');
        const errorField = field.parentElement.querySelector('.error-message');
        errorField.textContent = message;
    }

    // Função para limpar todas as mensagens de erro
    function clearErrors() {
        const errorFields = document.querySelectorAll('.error-message');
        errorFields.forEach(field => field.textContent = '');

        const erroredInputs = document.querySelectorAll('.form-group .error');
        erroredInputs.forEach(input => input.classList.remove('error'));
    }
});