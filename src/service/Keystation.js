const PopupCenter = (url, title, w, h, opts) => {
  let _innerOpts = ''
  if (opts !== null && typeof opts === 'object') {
    for (const p in opts) {
      if (opts.hasOwnProperty(p)) {
        _innerOpts += p + '=' + opts[p] + ','
      }
    }
  }
  // Fixes dual-screen position, Most browsers, Firefox
  const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : 0
  const dualScreenTop = window.screenTop != undefined ? window.screenTop : 0

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    _innerOpts +
      ' width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left,
  )

  return newWindow
}

export default function Keystation(client, lcd, path) {
  this.client = client
  this.lcd = lcd
  this.path = path

  // this.keystationUrl = "http://localhost:8080";
  this.keystationUrl = 'https://keystation.cosmostation.io'
}

Keystation.prototype.openWindow = function(type, payload, account = '') {
  // The account parameter is required for users having multiple keychain accounts.
  let apiUrl = ''
  switch (type) {
    case 'signin':
      apiUrl = 'signin'
      break
    case 'transaction':
      apiUrl = 'tx'
      break
  }

  return PopupCenter(
    this.keystationUrl +
      '/' +
      apiUrl +
      '?account=' +
      encodeURIComponent(account) +
      '&client=' +
      encodeURIComponent(this.client) +
      '&lcd=' +
      encodeURIComponent(this.lcd) +
      '&path=' +
      encodeURIComponent(this.path) +
      '&payload=' +
      encodeURIComponent(payload),
    '',
    '400',
    '690',
    { toolbar: 1, resizable: 1, location: 1, menubar: 1, status: 1 },
  )
}
