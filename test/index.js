var assert = require('assert');
var script = require('../');
var utils = require('bcoin-utils')

describe('Script', function() {
    it('should encode/decode script', function() {
        var src = '20' + '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f' + '20' + '101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f' + 'ac';

        var decoded = script.decode(utils.toArray(src, 'hex'));
        assert.equal(decoded.length, 3);
        assert.equal(
        utils.toHex(decoded[0]), '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f');
        assert.equal(
        utils.toHex(decoded[1]), '101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f');
        assert.equal(decoded[2], 'OP_CHECKSIG');

        var dst = script.encode(decoded);
        assert.equal(utils.toHex(dst), src);
    });

    it('should encode/decode numbers', function() {
        var testscript = [
            [],
            [1],
            [2],
            [16]
        ];
        var encoded = script.encode(testscript);
        assert.deepEqual(encoded, [0, 0x51, 0x52, 0x60]);
        var decoded = script.decode(encoded);
        assert.deepEqual(decoded, testscript);
    });
});
