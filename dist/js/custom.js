//-----Modal window
let modalWindow = (function() {
  const openModal = document.querySelector(".modal");
  M.Modal.init(openModal, {});
})();

//-----Swift UI Dom caching
let fnswiftPlayUI = (function() {
  const domCache = {
    wordbox: ".swift-word-box",
    socre: ".swift-score-number",
    time: ".swift-time-left",
    status: ".swift-status",
    inputvalue: "#autocomplete-input",
    input: ".wordinput"
  };

  return {
    wordbox: document.querySelector(domCache.wordbox),
    score: document.querySelector(domCache.socre),
    time: document.querySelector(domCache.time),
    status: document.querySelector(domCache.status),
    input: document.querySelector(domCache.inputvalue)
    // inputval: document.querySelector(domCache.inputvalue).value
  };
})();

//----Generate Words
let fnsiwftWordApi = (function(interface) {
  let word_generate;

  let wordapi = new fnwordApi();

  let callbackwithdata = function(err, res) {
    if (err) {
    } else {
      str = String(res.body);
      let words = str.match(/\b(\w+)\b/g);

      let words_index = Math.floor(Math.random() * words.length);

      word_generate = words[words_index];

      interface.wordbox.innerHTML = word_generate;
    }
  };

  //API Request
  return {
    callback: function() {
      let uniq_Id = Math.floor(Math.random() * (8 - 1 + 1) + 1);
      wordapi.getword(
        `https://jsonplaceholder.typicode.com/posts/${uniq_Id}`,
        callbackwithdata
      );
    }
  };
})(fnswiftPlayUI);

//-----Game-play UI Controllers
let fnswiftPlayController = (function(interface, wordapi) {
  let swiftTime = 5;
  let score = 0;
  let isgamestatus;

  interface.score.innerHTML = score;

  //Game init
  let fnswiftGameInit = function() {
    interface.input.addEventListener("input", fninputwordcheck);
    setInterval(fnEstimatedTime, 1000);
    setInterval(fnSwiftStatus, 50);
  };

  let fninputwordcheck = function() {
    if (fnwordEqual()) {
      document.querySelector("#autocomplete-input").value = "";
      swiftTime = 5;
      wordapi.callback();
      isgamestatus = true;
    }
    if (score === -1) {
      interface.score.innerHTML = 0;
    } else {
      interface.score.innerHTML = score;
    }
  };

  let fnwordEqual = function() {
    let inputvalue = document.querySelector("#autocomplete-input").value;
    if (inputvalue === interface.wordbox.innerHTML) {
      getvalue = inputvalue;
      score++;
      M.toast({ html: `${score}`, displayLength: 700 });
      return true;
    } else {
      return false;
    }
  };

  //Estimated Time Left
  let fnEstimatedTime = function() {
    if (swiftTime > 0) {
      swiftTime--;
    } else if (swiftTime == 0) {
      isgamestatus = false;
    }
    interface.time.innerHTML = swiftTime;
  };

  //Game Status
  let fnSwiftStatus = function() {
    if (!isgamestatus && swiftTime == 0) {
      interface.status.classList.remove("hide");
      score = -1;
    } else {
      interface.status.classList.add("hide");
    }
  };

  return {
    gameInit: fnswiftGameInit()
  };
})(fnswiftPlayUI, fnsiwftWordApi);

fnswiftPlayController.gameInit;
fnsiwftWordApi.callback();
