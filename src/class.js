(function(global) {
  var ZendeskClient = (function() {

    function ZendeskClient(subdomain, token) {
      this.apiUrl = 'https://' + subdomain + '.zendesk.com/api/v2';
      this.headers = {
        Authorization : 'Bearer ' + token
      };

      if (!subdomain) throw new Error('"subdomain"は必須です');
      if (!token) throw new Error('"token"は必須です');
    }

    ZendeskClient.prototype.getRecentTickets = function() {
      return this.fetch_('/tickets/recent.json',{'method': 'get'});
    };

    ZendeskClient.prototype.getSingleTicket = function(id) {
      return this.fetch_('/tickets/' + id + '.json',{'method': 'get'});
    };

    ZendeskClient.prototype.fetch_ = function(resource, options) {
      var endPoint = this.apiUrl + resource;
      var response = UrlFetchApp.fetch(endPoint, {
        method             : options.method,
        muteHttpExceptions : true,
        contentType        : 'application/json; charset=utf-8',
        headers            : this.headers,
        payload            : options.payload || {}
      });

      return {
        status : response.getResponseCode(),
        body   : response.getContentText()
      };
    };

    return ZendeskClient;
  })();

  return global.ZendeskClient = ZendeskClient;
})(this);
