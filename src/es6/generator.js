async function fetchImg (url) {
  const response = await fetch(url)
  if (response.ok) {
    return response.blob()
  } else {
    throw response
  }
}

function* getBlob () {
  console.log(1)
  const a = yield fetchImg('https://static.moschat.com/web_static/dota2_cover.jpg')
  console.log(2)
  console.log(a)
  const b = yield fetchImg('https://static.moschat.com/web_static/dota2_cover.jpg')
  console.log(b)
}

const getBlobStart = getBlob()

const chunk = function () {
  for (let x of getBlobStart) {
    console.log(x, performance.now())
  }
}

;(function () {
  function* a () {
    console.log('start')
    yield 1
    console.log('2')
    yield 2
    console.log(3)
    return 3
  }

  const a1 = a()
  console.log(a1)
  a1.next()
  a1.next()
  a1.next()
}())