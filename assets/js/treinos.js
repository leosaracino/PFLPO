$(document).ready(function () {
    var treinos = [];
    
    $('#adicionarExercicioBtn').click(function () {
        var exercicioHtml =
            '<div class="row">' +
            '<div class="col-md-4">' +
            '<input type="text" class="form-control" placeholder="Nome do Exercício">' +
            '</div>' +
            '<div class="col-md-4">' +
            '<input type="number" class="form-control" placeholder="Porcentagem">' +
            '</div>' +
            '<div class="col-md-4">' +
            '<input type="number" class="form-control" placeholder="Peso">' +
            '</div>' +
            '</div>';

        $('#exerciciosContainer').append(exercicioHtml);
    });

    $('#salvarTreinoBtn').click(function () {
        var exercicios = [];
        $('#exerciciosContainer .row').each(function () {
            var nomeExercicio = $(this).find('input:nth-child(1)').val();
            var porcentagem = $(this).find('input:nth-child(2)').val();
            var peso = $(this).find('input:nth-child(3)').val();

            exercicios.push({
                nomeExercicio: nomeExercicio,
                porcentagem: porcentagem,
                peso: peso
            });
        });

        var treino = {
            exercicios: exercicios,
            concluido: false
        };

        treinos.push(treino);
        adicionarTreinoNaTabela(treino);
        $('#adicionarTreinoModal').modal('hide');
    });

    $(document).on('change', '.treino-checkbox', function () {
        var treinoIndex = $(this).data('treino-index');
        var treino = treinos[treinoIndex];
        
        treino.concluido = this.checked;
        atualizarProgresso();
    });

    $(document).on('click', '#atualizarProgressoBtn', function () {
        atualizarProgresso();
    });

    $(document).on('click', '.btnExcluir', function () {
        var treinoIndex = $(this).data('treino-index');
        treinos.splice(treinoIndex, 1);
        atualizarTabelaTreinos();
        atualizarProgresso();
    });

    function adicionarTreinoNaTabela(treino) {
        var treinoHtml =
            '<tr>' +
            '<td>' +
            '<strong>Treino ' + (treinos.length) + '</strong>' +
            '<ul>';

        treino.exercicios.forEach(function (exercicio) {
            treinoHtml +=
                '<li>' +
                '<strong>Exercício:</strong> ' + exercicio.nomeExercicio + '<br>' +
                '<strong>Porcentagem:</strong> ' + exercicio.porcentagem + '<br>' +
                '<strong>Peso:</strong> ' + exercicio.peso +
                '</li>';
        });

        treinoHtml +=
            '</ul>' +
            '</td>' +
            '<td>' +
            '<input class="form-check-input treino-checkbox" type="checkbox" value="" id="treinoCheck' +
            (treinos.length) + '" data-treino-index="' + (treinos.length - 1) + '">' +
            '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-danger btn-sm btnExcluir" data-treino-index="' + (treinos.length - 1) + '"><i class="fas fa-trash"></i></button>' +
            '</td>' +
            '</tr>';

        $('#treinosTableBody').append(treinoHtml);
    }

    function atualizarTabelaTreinos() {
        $('#treinosTableBody').empty();
        treinos.forEach(function (treino, index) {
            adicionarTreinoNaTabela(treino);
            $('#treinoCheck' + index).prop('checked', treino.concluido);
        });
    }

    function atualizarProgresso() {
        var treinosConcluidos = treinos.filter(function (treino) {
            return treino.concluido;
        });

        var progresso = (treinosConcluidos.length / treinos.length) * 100;
        $('.progress-bar').css('width', progresso + '%').attr('aria-valuenow', progresso).text(progresso + '%');
    }
});
