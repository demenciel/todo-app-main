var toDoList = [];


function renderTodo(todo) {
  localStorage.setItem('toDoItemRef', JSON.stringify(toDoList));

  const list = document.querySelector('.tasks');


  const node = document.createElement("div");
  node.setAttribute('class', `input-task task `);
  node.setAttribute('id', todo.id);

  node.innerHTML = `
      <input id="check-click" class='check' type="checkbox"/>
      <span id='new-text' style="color:hsl(234, 39%, 85%); text-transform:capitalize; width:100%;">${todo.text}</span>
    `;

  list.prepend(node)
  $('#new-task-id').val("");


  //Remove selected from list
  $('#completed').click((e) => {
    e.preventDefault();
    var checked = document.querySelectorAll(".check:checked");
    checked.forEach((elem) => {
      var parent = elem.parentElement;
      var parentId = parent.id;
      var index = toDoList.map(function (item) {
        return item.id
      }).indexOf(parentId);

      toDoList.splice(index, 1);
      parent.remove();
      updateList();
      // Store new list
      localStorage.setItem('toDoItemRef', JSON.stringify(toDoList));
    });
  });

  updateList();

  // Change text on click
  $('#check-click').change(() => {
    var fav, favs = [];
    var checked = document.querySelectorAll(".check");
    checked.forEach((elem) => {
      // change colo
      // cross text
      var parent = elem.parentElement;
      var span = parent.getElementsByTagName('span');
      if ($(elem).prop('checked')) {
        $(span).addClass('text-overline')
      } else if ($(elem).prop('checked', false)) {
        $(span).removeClass('text-overline')
      } else console.log('bug');
    });

    var checkedClick = document.querySelectorAll('#check-click');
    checkedClick.forEach((e)=> {
      fav = { id: $(e).attr('id'), value: $(e).prop('checked') };
      favs.push(fav);
    });
    localStorage.setItem("favorites", JSON.stringify(favs));
  });
};

// Save checkbox


// update list number
function updateList() {
  for (i = 0; i < toDoList.length; i++) {
    var itemLeft = toDoList.length;
    $('#items').text(itemLeft);
  }
};

function addTodo(text) {
  var todo = {
    text,
    id: Date.now(),
  };

  toDoList.push(todo);
  renderTodo(todo);
};


$('form').submit((e) => {
  event.preventDefault();
  // select the text input
  var newTask = $('#new-task-id').val();
  addTodo(newTask);
});


////////////////// Footer //////////////////

// Clear all tasks
$('#clear').click(function (e) {
  e.preventDefault();
  $('.input-task').remove();
  $('#items').text(0);
  toDoList.length = 0;
  window.localStorage.clear();
});


// Select All
$('#all').click(function (e) {
  e.preventDefault()
  var checkboxes = document.querySelectorAll('#check-click');
  checkboxes.forEach((cb) => {
    var parent = cb.parentElement;
    var span = parent.getElementsByTagName('span');

    if ($(cb).prop('checked', false)) {
      $(cb).prop('checked', true);
      $(span).addClass('text-overline');
    } else if ($(cb).prop('checked')) {
      $(cb).prop('checked', false);
      $(span).removeClass('text-overline')
    } else console.log('bug');
  });
});

// Change footer click color
$('.footer a').change(() => {
  $(".footer a").addClass('footer-click')
});




////////////// Activate Light/Dark Mode ////////////////

$('#light-mode').click(() => {
  // icon switch
  $('#dark-mode').show();
  $('#light-mode').hide();

  // other switches
  $('.background').addClass('background-light');
  $('body').addClass('body-light');
  $('.task').addClass('task-light');
  $('.footer').addClass('footer-light');
});

$('#dark-mode').click(() => {
  // icon switch
  $('#dark-mode').hide();
  $('#light-mode').show();

  // other switches
  $('.background').removeClass('background-light');
  $('body').removeClass('body-light');
  $('.task').removeClass('task-light');
  $('.footer').removeClass('footer-light');


});




//////////////////// Local Storage ////////////////

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('toDoItemRef');
  if (ref) {
    toDoList = JSON.parse(ref);
    toDoList.forEach(t => {
      renderTodo(t);
    });
  };
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  for (var i = 0; i < favorites.length; i++) {
    var fav = '#' + favorites[i].id;
    var value = favorites[i].value;
    console.log(fav.checked = value)
  };
});

// $(document).ready(() => {
//   var favorites = JSON.parse(localStorage.getItem('favorites'));
//   for (var i = 0; i < favorites; i++) {
//     console.log($('#' + favorites[i].id).prop('checked', favorites[i].value));
//   };
// });




















