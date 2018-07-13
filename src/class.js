(function(global) {
  var ZendeskClient = (function() {

    function ZendeskClient(subdomain, token) {
      this.apiUrl = 'https://' + subdomain + '.zendesk.com/api/v2';
      this.headers = {'Authorization': 'Bearer ' + token};

      if (!subdomain) throw new Error('"subdomain"は必須です');
      if (!token) throw new Error('"token"は必須です');
    }

    ZendeskClient.prototype.getRecentTicket = function() {
      return this.fetch_('/tickets/recent.json',{'method': 'get'});
    };

    ZendeskClient.prototype.fetch_ = function(resource, options) {
      var endPoint = this.apiUrl + resource;
      var response = UrlFetchApp.fetch(endPoint, {
        'method': options.method,
        'muteHttpExceptions': true,
        'contentType': 'application/json; charset=utf-8',
        'headers': this.headers,
        'payload': options.payload || {}
      });

      if (response.getResponseCode() == 200) {
        return JSON.parse(response.getContentText());
      }

      console.warn('Request failed. Expected 200, got %d: %s', response.getResponseCode(), response.getContentText());
      return false;
    };

    return ZendeskClient;
  })();

  return global.ZendeskClient = ZendeskClient;
})(this);
