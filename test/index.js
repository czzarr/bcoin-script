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
            1,
            2,
            16
        ];
        var encoded = script.encode(testscript);
        assert.deepEqual(encoded, [0, 0x51, 0x52, 0x60]);
        var decoded = script.decode(encoded);
        assert.deepEqual(decoded, testscript);
    });

    it('should decode this fucking tx', function () {
      var encoded = [ 4, 255, 255, 0, 29, 1, 4, 69, 84, 104, 101, 32, 84, 105, 109, 101, 115, 32, 48, 51, 47, 74, 97, 110, 47, 50, 48, 48, 57, 32, 67, 104, 97, 110, 99, 101, 108, 108, 111, 114, 32, 111, 110, 32, 98, 114, 105, 110, 107, 32, 111, 102, 32, 115, 101, 99, 111, 110, 100, 32, 98, 97, 105, 108, 111, 117, 116, 32, 102, 111, 114, 32, 98, 97, 110, 107, 115, 255, 255, 255, 255, 1, 0, 242, 5, 42, 1, 0, 0, 0, 67, 65, 4, 103, 138, 253, 176, 254, 85, 72, 39, 25, 103, 241, 166, 113, 48, 183, 16, 92, 214, 168, 40, 224, 57, 9, 166, 121, 98, 224, 234, 31, 97, 222, 182, 73, 246, 188, 63, 76, 239, 56, 196, 243, 85, 4, 229, 30, 193, 18, 222, 92, 56, 77, 247, 186, 11, 141, 87, 138, 76, 112, 43, 107, 241, 29, 95, 172, 0, 0, 0, 0 ]
      var decoded = script.decode(encoded);
      assert.deepEqual(script.encode(decoded), encoded)

    })
});
