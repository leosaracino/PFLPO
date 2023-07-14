document.addEventListener('DOMContentLoaded', function() {
   // Array para armazenar os registros
   let recordes = [];

   // Manipulador de clique do botão "Salvar"
   document.getElementById('btnSalvar').addEventListener('click', function() {
      // Obtenha os valores dos campos
      const data = document.getElementById('data').value;
      const exercicio = document.getElementById('exercicio').value;
      const peso = document.getElementById('peso').value;

      // Validação de entrada numérica para o campo de peso
      if (!isNumeric(peso)) {
         alert("Por favor, insira um valor numérico para o peso.");
         return;
      }

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
      recordes.forEach(function(recorde, index) {
         const row = tabela.insertRow();
         const cellNome = row.insertCell();
         const cellPeso = row.insertCell();
         const cellData = row.insertCell();
         const cellExcluir = row.insertCell();

         cellNome.textContent = recorde.exercicio;
         cellPeso.textContent = recorde.peso;
         cellData.textContent = recorde.data;

         // Adicione o botão de exclusão
         const botaoExcluir = document.createElement('button');
         botaoExcluir.classList.add('btn', 'btn-danger', 'btn-sm');
         botaoExcluir.innerHTML = '<i class="fas fa-trash"></i>';
         botaoExcluir.addEventListener('click', function() {
            excluirRecorde(index);
         });
         cellExcluir.appendChild(botaoExcluir);
      });
   }

   // Função para excluir um recorde
   function excluirRecorde(index) {
      recordes.splice(index, 1);
      atualizarTabelaRecordes();
   }

   // Função auxiliar para verificar se um valor é numérico
   function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
   }

   // Função para organizar a lista de recordes
   function ordenarRecordes(criterio) {
      recordes.sort(function(a, b) {
         if (criterio === 'nome') {
            return a.exercicio.localeCompare(b.exercicio);
         } else if (criterio === 'peso') {
            return parseFloat(a.peso) - parseFloat(b.peso);
         } else if (criterio === 'data') {
            return new Date(a.data) - new Date(b.data);
         }
      });
      atualizarTabelaRecordes();
   }

   // Manipuladores de clique dos botões de organização
   document.getElementById('btnOrdenarNome').addEventListener('click', function() {
      ordenarRecordes('nome');
   });

   document.getElementById('btnOrdenarPeso').addEventListener('click', function() {
      ordenarRecordes('peso');
   });

   document.getElementById('btnOrdenarData').addEventListener('click', function() {
      ordenarRecordes('data');
   });
});