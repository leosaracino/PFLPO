document.addEventListener('DOMContentLoaded', function() {
    // Array para armazenar os registros
    let recordes = [];
 
    // Manipulador de clique do botão "Salvar"
    document.getElementById('btnSalvar').addEventListener('click', function() {
       // Obtenha os valores dos campos
       const data = document.getElementById('data').value;
       const exercicio = document.getElementById('exercicio').value;
       const peso = document.getElementById('peso').value;
 
       // Crie um objeto com os valores
       const recorde = { data, exercicio, peso };
 
       // Adicione o recorde ao array
       recordes.push(recorde);
 
       // Limpe os campos do formulário
       document.getElementById('formAdicionar').reset();
 
       // Atualize a tabela
       atualizarTabelaRecordes();
    });
 
    // Função para atualizar a tabela de recordes
    function atualizarTabelaRecordes() {
       const tabela = document.getElementById('tabelaRecordes');
 
       // Limpe a tabela
       tabela.innerHTML = '';
 
       // Adicione os registros na tabela
       recordes.forEach(function(recorde) {
          const row = tabela.insertRow();
          const cellNome = row.insertCell();
          const cellPeso = row.insertCell();
          const cellData = row.insertCell();
 
          cellNome.textContent = recorde.exercicio;
          cellPeso.textContent = recorde.peso;
          cellData.textContent = recorde.data;
       });
    }
 });
 