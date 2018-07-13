/**
 * Zendesk Clientのインスタンスを作成する
 * @param {String} subdomain Zendesk URLのサブドメン
 * @param {String} token OAuthアクセストークン
 * @return {ZendeskClient} Zendesk Clientのインスタンス
 */
function create(subdomain, token) { // eslint-disable-line no-unused-vars
  return new PractiTestClient(subdomain, token);
}

/**
 * 最近表示されたチケットを取得する
 * @return {Object} チケット情報のオブジェクト
 */
function getRecentTicket() { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
