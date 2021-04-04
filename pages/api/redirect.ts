import { NextApiRequest, NextApiResponse } from 'next'

// http://localhost:3000/api/redirect?repo=test&wow=abc
export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.query)
    res.redirect('https://github.com')
}
