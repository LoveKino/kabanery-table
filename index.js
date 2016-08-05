'use strict';

let {
    n, view
} = require('kabanery');

/**
 * tableData = {
 *      head: [],
 *      body: [[]]
 * }
 *
 */
module.exports = view((tableData = {}) => {
    let head = tableData.head;
    let body = tableData.body;
    let foot = tableData.foot;

    let tableStyles = tableData.tableStyles || {};

    return n('table', tableStyles, [
        head && n('thead', n('tr', renderHeads(head))),
        body && n('tbody', renderRows(body)),

        foot && n('tfoot', renderRow(foot))
    ]);
});

let renderRows = (rows) => renderList(rows, 'tr', renderRow);

let renderRow = (row) => renderList(row, 'td');

let renderHeads = (row) => renderList(row, 'th');

let id = v => v;

let renderList = (list, tagName, handler = id) => {
    let nlist = [];
    for (let i = 0; i < list.length; i++) {
        nlist.push(n(tagName, handler(list[i])));
    }
    return nlist;
};
