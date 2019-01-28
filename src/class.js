(function(global) {
  var ZendeskClient = (function() {

    function ZendeskClient(subdomain, email, password, apiToken, accessToken) {
      this.apiUrl = 'https://' + subdomain + '.zendesk.com/api/v2';

      var authStr;
      if (email) {
        if (password) {
          authStr = email + ':' + password;
        } else if (apiToken) {
          authStr = email + '/token:' + apiToken;
        } else {
          throw new Error('"password"または"apiToken"は必須です');
        }
        this.headers = {
          Authorization: 'Basic ' + Utilities.base64Encode(authStr)
        };
      } else if (accessToken) {
        this.headers = {
          Authorization: 'Bearer ' + accessToken
        };
      } else {
        throw new Error('"email"または"accessToken"は必須です');
      }
    }

    ZendeskClient.prototype.getRecentTickets = function() {
      return this.fetch_('/tickets/recent.json',{'method': 'get'});
    };

    ZendeskClient.prototype.getSingleTicket = function(id) {
      return this.fetch_('/tickets/' + id + '.json',{'method': 'get'});
    };

    ZendeskClient.prototype.searchTickets = function (query, options) {
      if (!query) throw new Error('"query"は必須です');

      var param = Utilities.formatString('query=type:ticket %s', query);
      for (var key in options) {
        param += '&' + Utilities.formatString('%s=%s', key, options[key]);
      }
      return this.fetch_(Utilities.formatString('/search.json?%s', encodeURIComponent(param)), { method: 'get' });
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
