const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealSting', () =>{
    it('should reject non string values', () =>{
        const res = isRealString(100);
        expect(res).toBe(false)
    });

    if('should reject non string value', () => {
        const res = isRealString('     ');
        expect(res).toBe(false);
    });

    if('should allow non space string values', () => {
        const res = isRealString(' shiva  ');
        expect(res).toBe(true);
    });
});

