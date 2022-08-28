module.exports = (router) => {
    router.get('/example', (req, res) => {
        res.send('example site');
    });
};