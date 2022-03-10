fetch('./list.json')
    .then(res => res.json())
    .then(({data}) => {
      window.ALL_LIST = createList(data);
      renderListToDom(window.ALL_LIST)
    })


function createList(list) {
  const arr = []
  list.forEach(({serial, range, single}) => {
    single.forEach(num => arr.push(`${serial} ${num}`)
    );
    range.forEach(({from, to}) => {
      for (let num = from; num <= to; num++) {
        arr.push(`${serial} ${num}`);
      }
    })
  })
  return arr
}

function renderListToDom(list) {
  const listNode = document.getElementById('pass_list')
  const fragment = document.createDocumentFragment();
  list.forEach(p => {
    const d = document.createElement('div')
    d.innerText = p
    fragment.append(d)
  })
  listNode.innerHTML = ""
  listNode.appendChild(fragment);
}

function filterList(e) {
  e.preventDefault();
  const code = e.data?.toLowerCase().charCodeAt();

  if (Number.isInteger(Number(e.data)) || code >= 1072 && code <= 1103  || code === 1110 || code === 1111  || e.data == null) {
    const input = e.target.value.toLowerCase().replace(' ', '');
    const newList = window.ALL_LIST.filter(num => {
      const n = num.toLowerCase().replace(" ", '')
      return n.includes(input)
    })
    renderListToDom(newList)
  } else {
    const prev = e.target.value.slice(0, -1);
    document.getElementById('passport').value = prev
  }
}

const inputEl = document.getElementById('passport');
inputEl.oninput = filterList

