var update = document.getElementById('update')

update.addEventListener('click', function() {
  fetch('entries', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'date': 'Most Recent'
    })
  }).then(res => {
    if (res.ok) return res.json()
  }).then(data => {
    console.log(data);
    window.location.reload(true)
  })
})

function deleteEntries(btn) {
  var id = btn.dataset.entriesId;
  console.log(id);
  fetch('/entries/' + btn.dataset.entriesId, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      '_id': btn.dataset.entriesId
    })
  }).then(res => {
    if (res.ok) return res.json()
  }).then(data => {
    console.log(data);
    window.location.reload()
  })
}

// var del = document.getElementById('delete');
//
// del.addEventListener('click', function() {
//   fetch('entries', {
//     method: 'delete',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       'date' : 'Most Recent'
//     })
//   }).then(res => {
//     if (res.ok) return res.json()
//   }).then(data => {
//     console.log(data)
//     window.location.reload()
//   })
// })
