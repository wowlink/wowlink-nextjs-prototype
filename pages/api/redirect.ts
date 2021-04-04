import { NextApiRequest, NextApiResponse } from 'next'

// Use http://localhost:3000/api/redirect?repo=test&wow=gh for testing to navigate to GitHub
export default (req: NextApiRequest, res: NextApiResponse) => {
    const wowlink: string = req.query['wow'] as string;
    console.log(wowlink);
    const lookup: Record<string, string> = {
        "gh": "https://github.com",
        "goo": "https://google.com",
    };
    // This should be a function that looks up wowlink existence
    if (wowlink in lookup) {
        // The link conversion should also be some kind of API
        // to make future implementation of partial replacement
        // easier.
        res.redirect(lookup[wowlink]);
    } else {
        res.redirect('/');
    }
}
