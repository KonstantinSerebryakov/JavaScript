const {addNewPosition, getAllPositions} = require('./positions');
module.exports = {
    positions: {
        post: async (newPosition, res) => {
            try {
                const id = await addNewPosition(newPosition);
                res.setHeader('Location', '/positions/' + id);
                res.statusCode = 201;
                res.end();
                return `New position with id='${id}' created`;
            } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify(e));
                return e;
            }
        },

        get: async (body, res) => {
            try {
                const positions = await getAllPositions();

                res.setHeader('content-type', 'application/json');
                res.statusCode = 200;

                res.end(JSON.stringify(positions));
                return `All positions has been sent`;
            } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify(e));
                return e;
            }
        }
    }
}