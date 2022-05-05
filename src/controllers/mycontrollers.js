// The files in this directory contain functions that handle requests coming to different routes
function coinFlip() {
    return (Math.random() > 0.5) ? "heads" : "tails"
}
function coinFlips(flips) {
    let ret = []
    for (var i=0; i < flips; i++) {
      ret.push(coinFlip())
    }
    return ret
}
function countFlips(array) {
    var tailcount = 0
    var headcount = 0
    for (let i=0; i<array.length; i++) {
      if (array[i] == "heads") {
        headcount += 1;
      }
      if (array[i] == "tails") {
        tailcount += 1;
      }
    }
    if (tailcount == 0) {
      return {heads:headcount}
    }
    if (headcount == 0) {
      return {tails:tailcount}
    }
    return { tails: tailcount, heads: headcount}
}
function flipACoin(call) {
     var flip = coinFlip()
     var res = ""
    if (flip == call) {
      var res = 'win'
    }
    if (flip != call) {
      var res = 'lose'
    }
    return {call: call, flip: flip, result: res}
}