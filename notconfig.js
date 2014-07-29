var debug = 1;

module.exports = {
    url: debug ? "mysql://b818637cc71375:19074626@us-cdbr-iron-east-01.cleardb.net/heroku_e2b205b16bbce16?reconnect=true" : 'localhost',
    username: debug ? 'b818637cc71375' : 'gadget69',
    password: debug ? '19074626' : ''
}
