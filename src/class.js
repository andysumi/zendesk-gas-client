var _ = Underscore.load();

(function (global) {
  var ZendeskClient = (function() {

    function ZendeskClient(subdomain, email, password, apiToken, accessToken) {
      this.apiUrl = Utilities.formatString('https://%s.zendesk.com/api/v2', subdomain);

      var authStr;
      if (email) {
        if (password) {
          authStr = Utilities.formatString('%s:%s', email, password);
        } else if (apiToken) {
          authStr = Utilities.formatString('%s/token:%s', email, apiToken);
        } else {
          throw new Error('"password"または"apiToken"は必須です');
        }
        this.headers = {
          Authorization: Utilities.formatString('Basic %s', Utilities.base64Encode(authStr))
        };
      } else if (accessToken) {
        this.headers = {
          Authorization: Utilities.formatString('Bearer %s', accessToken)
        };
      } else {
        throw new Error('"email"または"accessToken"は必須です');
      }
    }

    ZendeskClient.prototype.getRecentTickets = function (options) {
      var paramString = this.buildParameter_(options);
      return this.fetch_(Utilities.formatString('/tickets/recent.json%s', paramString), {method: 'get'});
    };

    ZendeskClient.prototype.getSingleTicket = function(id) {
      return this.fetch_(Utilities.formatString('/tickets/%d.json', id), {method: 'get'});
    };

    ZendeskClient.prototype.searchTickets = function (query, options) {
      if (!query) throw new Error('"query"は必須です');

      if (!options) options = {};
      var paramString = this.buildParameter_(_.extend({
        query: Utilities.formatString('type:ticket %s', query)
      }, options));
      return this.fetch_(Utilities.formatString('/search.json%s', paramString), {method: 'get'});
    };

    ZendeskClient.prototype.getTicketComments = function (id, options) {
      var paramString = this.buildParameter_(options);
      return this.fetch_(Utilities.formatString('/tickets/%d/comments.json%s', id, paramString), {method: 'get'});
    };

    ZendeskClient.prototype.getSingleUser = function (id) {
      return this.fetch_(Utilities.formatString('/users/%d.json', id), { method: 'get' });
    };

    ZendeskClient.prototype.buildParameter_ = function (options) {
      if (!options) return '';

      var params = [];
      for (var key in options) {
        params.push(Utilities.formatString('%s=%s', key, encodeURI(options[key])));
      }
      return '?' + params.join('&');
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
