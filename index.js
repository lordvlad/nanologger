var emojis = {
  debug: '🐛',
  info: '✨',
  warn: '⚠️',
  error: '🚨',
  fatal: '💀'
}

var levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60
}

var colors = {
  foreground: '#d3c0c8',
  background: '#2d2d2d',
  black: '#2d2d2d',
  red: '#f2777a',
  green: '#99cc99',
  yellow: '#ffcc66',
  blue: '#6699cc',
  magenta: '#cc99cc',
  cyan: '#66cccc',
  white: '#d3d0c8',
  brightBlack: '#747369'
}

module.exports = Nanologger

function Nanologger (name) {
  if (!(this instanceof Nanologger)) return new Nanologger(name)
  this._name = name || ''
  this.logLevel = window.localStorage.getItem('logLevel') || 'info'
  this._logLevel = levels[this.logLevel]
}

Nanologger.prototype.debug = function (data) {
  this._print('debug', data)
}

Nanologger.prototype.info = function (data) {
  this._print('info', data)
}

Nanologger.prototype.warn = function (data) {
  this._print('warn', data)
}

Nanologger.prototype.error = function (data) {
  this._print('error', data)
}

Nanologger.prototype.fatal = function (data) {
  this._print('fatal', data)
}

Nanologger.prototype._print = function (level, data) {
  var time = this._getTimeStamp()
  var emoji = emojis[level]
  var name = this._name || 'unknown'
  var c = this._c

  var msgColor = (level === 'error' || level.fatal)
    ? colors.red
    : (level === 'warn')
      ? colors.yellow
      : colors.green

  var msg = '%c' + time + ' ' + emoji + ' %c' + name + ' %c' + data
  console.log(msg, c(colors.brightBlack), c(colors.magenta), c(msgColor))
}

Nanologger.prototype._c = function (color) {
  return 'color: ' + color + ';'
}

Nanologger.prototype._getTimeStamp = function () {
  var date = new Date()
  var hours = this._pad(date.getHours().toString())
  var minutes = this._pad(date.getMinutes().toString())
  var seconds = this._pad(date.getSeconds().toString())
  return hours + ':' + minutes + ':' + seconds
}

Nanologger.prototype._pad = function (str) {
  return (str.length !== 2) ? '0' + str : str
}
