var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'shiva';
        var text = 'narmina i love u';
        var message = generateMessage(from, text);

        // expect(message.createAt).toBeA('number')
        expect(typeof message.createAt).toBe('number');
        expect(typeof { from, text}).toBe('object');
        // expect(message).toInclude()
    });
});