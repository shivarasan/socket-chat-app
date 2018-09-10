const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'shiva';
        const text = 'narmina i love u';
        const message = generateMessage(from, text);

        expect(typeof message.createAt).toBe('number');
        expect(typeof { from, text}).toBe('object');
    });
});

describe('generateLocationMsg',() => {
    it('should be generate correct location msg', () => {
        const from = 'admin';
        const lat = 15;
        const lng = 16;
        const message = `https://www.google.com/maps?${lat},${lng}`;
        const msg = generateLocationMessage(from, lat, lng);
        expect(typeof msg.createdAt).toBe('number');
        expect(typeof {from,message }).toBe('object');
    })

});