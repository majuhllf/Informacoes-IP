const btnSearch = document.getElementById('btnSearch');
const ipInput = document.getElementById('ipInput');
const resultTable = document.getElementById('resultTable');

btnSearch.addEventListener('click', async () => {
    const ip = ipInput.value.trim();
    
    if (!ip) {
        alert("Por favor, digite um IP!");
        return;
    }

    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        
        if (!response.ok) {
            throw new Error("Não foi possível encontrar este IP.");
        }

        const data = await response.json();

        // Verifica se a API retornou um objeto de erro interno
        if (data.error) {
            throw new Error(data.reason || "IP Inválido");
        }

        // Criar uma nova linha na tabela
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.ip}</td>
            <td>${data.org || 'N/A'}</td>
            <td>${data.country_name}</td>
            <td>${data.city}</td>
            <td><button class="btn-clear" onclick="removeRow(this)">X</button></td>
        `;

        resultTable.appendChild(row);
        ipInput.value = ''; 

    } catch (error) {
        console.error("Detalhes do erro:", error);
        alert("Erro: " + error.message);
    }
}); // <--- ESSA CHAVE ESTAVA FALTANDO!

// Função para remover a linha
function removeRow(button) {
    button.parentElement.parentElement.remove();
}
