// ###############################################
// ########### AJAX PARA ACESSAR API #############
// ###############################################
// GET - Ler dados da API e preencher a tabela
$.ajax({
    url: 'https://site-sq75eata2q-uc.a.run.app/v1/api/cadastro/',
    method: 'GET',
    success: function(data) {
        var tableBody = '';
        data.forEach(function(item) {
            tableBody += '<tr>';
            tableBody += '<td>' + item.titulo + '</td>';
            tableBody += '<td>' + item.status + '</td>';
            tableBody += '<td><a href="#" class="edit-item" data-id="' + item.id + '">Editar</a> | <a href="#" class="delete-item" data-id="' + item.id + '">Excluir</a></td>';
            tableBody += '</tr>';
        });
        $('tbody').html(tableBody);
    },
    error: function(error) {
        console.log(error);
    }
});

// POST - Criar cadastro
$(document).ready(function() {
    // Adicionar um evento de envio ao formulário de criação de tarefas
    $('#createTaskForm').submit(function(event) {
      event.preventDefault();
    
      // Obter os dados do formulário
      var title = $('#createTaskModal #title2').val();
      var status = $('#createTaskModal #status2').val();
    
      // Relizar solicitação AJAX para criar a nova tarefa
      $.ajax({
        url: 'https://site-sq75eata2q-uc.a.run.app/v1/api/cadastro',
        type: 'POST',
        data: JSON.stringify({titulo: title, status: status}),
        contentType: 'application/json',
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader('X-CSRFToken', $('input[name="csrfmiddlewaretoken"]').val());
        },
        success: function() {
          // Atualizar a tabela de tarefas para refletir a alteração
          atualizarTabela();
          $('#createTaskModal').modal('hide');
        }
      });
    });
    
    // Adicionar um evento de clique ao botão de adicionar tarefa
    $('#addTaskBtn').click(function() {
      // Definir os valores iniciais dos campos
      $('#createTaskModal').off('submit2');
      $('#createTaskModal #title2').val('');
      $('#createTaskModal #status2').val('pendente');
    
      // Abrir o modal de criação de tarefas
      $('#createTaskModal').modal('show');
    });
});
  

// PUT - Atualizar cadastro, primeiramente fazer um GET para pegar o cadastro da linha selecionada;
$('table').on('click', '.edit-item', function() {
    // Obter a ID da tarefa a ser editada a partir do atributo 'data-id' do botão
    var taskId = $(this).data('id');

    // Realizar solicitação AJAX para obter os dados da tarefa
    $.ajax({
        url: 'https://site-sq75eata2q-uc.a.run.app/v1/api/cadastro/' + taskId,
        method: 'GET',
        success: function(data) {
            // Preencher o formulário de edição com os dados da tarefa
            $('#editTaskModal #taskId').val(data.id); 
            $('#editTaskModal #title').val(data.titulo);         
            $('#editTaskModal #status').val(data.status);      

            // Abrir o modal de edição
            $('#editTaskModal').modal('show');
        },
        error: function(error) {
            console.log(error);
        }
    });
});

    // Adicionar um evento de envio ao formulário de edição
  $('#editTaskForm').submit(function(event) {
    event.preventDefault();
  
    // Obter os dados do formulário
    var taskId = $('#editTaskModal #taskId').val();
    var title = $('#editTaskModal #title').val();
    var status = $('#editTaskModal #status').val();
  
    // Realizar solicitação AJAX para atualizar a tarefa
    $.ajax({
      url: 'https://site-sq75eata2q-uc.a.run.app/v1/api/cadastro/' + taskId,
      type: 'PUT',
      data: JSON.stringify({titulo: title, status: status}),
      contentType: 'application/json',
      beforeSend: function(xhr, settings) {
       xhr.setRequestHeader('X-CSRFToken', $('input[name="csrfmiddlewaretoken"]').val());
       },
      success: function() {
        // Atualizar a tabela de tarefas para refletir a alteração
        atualizarTabela();
       $('#editTaskModal').modal('hide');
    }
  });
});
  
// DELETE - Deletar linha selecionada 
$(document).ready(function() {
    // Adicionar evento de clique aos links "Excluir"
    $('tbody').on('click', '.delete-item', function(event) {
        event.preventDefault();
        var itemId = $(this).attr('data-id');
        // Enviar solicitação DELETE para o servidor
        $.ajax({
            url: 'https://site-sq75eata2q-uc.a.run.app/v1/api/cadastro/' + itemId,
            method: 'DELETE',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('X-CSRFToken', $('input[name="csrfmiddlewaretoken"]').val());
            },
            success: function() {
                // Remover linha da tabela correspondente ao item excluído
                $(event.target).closest('tr').remove();
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});

// Atualizar lista após fechar o modal
function atualizarTabela() {
$.ajax({
    url: 'https://site-sq75eata2q-uc.a.run.app/v1/api/cadastro/',
    method: 'GET',
    success: function(data) {
    var tableBody = '';
    data.forEach(function(item) {
        tableBody += '<tr>';
        tableBody += '<td>' + item.titulo + '</td>';
        tableBody += '<td>' + item.status + '</td>';
        tableBody += '<td><a href="#" class="edit-item" data-id="' + item.id + '">Editar</a> | <a href="#" class="delete-item" data-id="' + item.id + '">Excluir</a></td>';
        tableBody += '</tr>';
    });
    $('tbody').html(tableBody);
    },
    error: function(error) {
    console.log(error);
    }
});
};

// Fechar o modal no Cancelar e no 'x'
$('#editTaskModal .btn-secondary').on('click', function() {
    $('.modal').modal('hide');
});    

$('.modal-header .close').on('click', function() {
    $('.modal').modal('hide');
});





