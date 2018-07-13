/**
 * Zendesk Clientのインスタンスを作成する
 * @param {String} subdomain Zendesk URLのサブドメン
 * @param {String} token OAuthアクセストークン
 * @return {ZendeskClient} Zendesk Clientのインスタンス
 */
function create(subdomain, token) { // eslint-disable-line no-unused-vars
  return new PractiTestClient(subdomain, token);
}
