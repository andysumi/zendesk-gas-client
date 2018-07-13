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

    return ZendeskClient;
  })();

  return global.ZendeskClient = ZendeskClient;
})(this);
