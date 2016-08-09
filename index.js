'use strict';

let {
    map, forEach
} = require('bolzano');

let {
    n, view
} = require('kabanery');

/**
 * tableData = {
 *      head: [],
 *      body: [{
 *          name: value
 *      }],
 *      foot,
 *      enableChosen,
 *      chosenPropName
 * }
 *
 * TODO type
 */

module.exports = view(({
    head, body, enableChosen, headChosen,
    tableStyles = {}, chosenPropName = 'chosen', onchangeItemPropName = 'onchange'
} = {}, {
    update
}) => {
    let heads = map(head, (item) => n('th', item));
    if (enableChosen) {
        headChosen = !!headChosen;
        heads.unshift(n('th', n(`input type=checkbox ${headChosen? 'checked=true': ''}`, {
            onclick: () => {
                headChosen = !headChosen;
                forEach(body, (raw) => {
                    changeChosenItem(raw, headChosen);
                });
                update('headChosen', headChosen);
            }
        })));
    }

    let changeChosenItem = (raw, v) => {
        raw[chosenPropName] = v;
        let onchangeHandler = raw[onchangeItemPropName];
        onchangeHandler && onchangeHandler(raw);
    };

    return n('table', tableStyles, [
        head && n('thead', n('tr', heads)),

        body && n('tbody', map(body, (raw) => {
            let line = map(head, (name) => {
                let value = raw[name];
                return n('td', value);
            });

            raw[chosenPropName] = !!raw[chosenPropName];
            if (enableChosen) {
                line.unshift(
                    n('td', n(`input type=checkbox ${raw[chosenPropName]? 'checked=true': ''}`, {
                        onclick: () => {
                            changeChosenItem(raw, !raw[chosenPropName]);
                        }
                    }))
                );
            }

            return n('tr', line);
        }))
    ]);
});
