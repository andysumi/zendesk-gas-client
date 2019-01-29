/**
 * Zendesk Clientのインスタンスを作成する
 * @param {String} subdomain Zendesk URLのサブドメン (https://◯◯◯.zendesk.com/)
 * @param {String} email メールアドレス
 * @param {String} password パスワード
 * @param {String} apiToken APIトークン
 * @param {String} accessToken OAuthアクセストークン
 * @return {ZendeskClient} Zendesk Clientのインスタンス
 */
function create(subdomain, email, password, apiToken, accessToken) { // eslint-disable-line no-unused-vars
  return new ZendeskClient(subdomain, email, password, apiToken, accessToken);
}

/**
 * 最近表示されたチケットを取得する
 * @param {Object} options オプション
 * @return {Object} チケット情報のオブジェクト
 * https://developer.zendesk.com/rest_api/docs/support/tickets#list-tickets
 */
function getRecentTickets() { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定した1つのチケットを取得する
 * @param {Integer} id チケットのid
 * @return {Object} チケット情報のオブジェクト
 */
function getSingleTicket(id) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * チケットを検索する
 * @param {String} query 検索条件
 * @param {Object} options オプション
 * @return {Object} チケット情報のオブジェクト
 * https://developer.zendesk.com/rest_api/docs/support/search#list-search-results
 */
function searchTickets(query, options) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したチケットのコメントを取得する
 * @param {Integer} id チケットID
 * @param {Object} options オプション
 * @return {Object} コメント情報のオブジェクト
 * https://developer.zendesk.com/rest_api/docs/support/ticket_comments#list-comments
 */
function getTicketComments(id, options) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
