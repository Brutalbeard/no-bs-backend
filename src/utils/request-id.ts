import { v4 as uuidv4 } from 'uuid';

const requestIdHeader = function (req, res, next) {
    req.headers['x-no-bs-request-id'] = uuidv4();
    res.append('x-no-bs-request-id', req.headers['x-no-bs-request-id']);

    console.log({
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params,
        method: req.method,
    });
    next();
}

export default requestIdHeader;