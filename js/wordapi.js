let fnwordApi = (function() {
  let fnwordApi = function() {
    this.http = new XMLHttpRequest();
  };

  fnwordApi.prototype.getword = function(url, callback) {
    let self = this;
    this.http.open("GET", url, true);
    this.http.onload = function() {
      callback(null, JSON.parse(self.http.responseText));
    };
    this.http.send();
  };

  return fnwordApi;
})();
