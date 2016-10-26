const validator = require('html-validator');

module.exports = async (req, res) => {
    const { settings, code } = req.body;

    if(!code) {
        return res.json({ warnings: ['Code cannot be falsy'] })
    }

    validator({
        format: 'text',
        data: code
    }, function(err, results) {
        if(err) {
            return res.status(500).json({ warnings: [{ text: `${err}` }] })
        }

        if(results.includes('The document validates according to the specified schema(s).')) {
            res.json({ warnings: [] })
        } else {
            res.json({ warnings: [{ text: results }] })
        }
    });
};
