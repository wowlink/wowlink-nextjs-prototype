import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from "@octokit/rest";

// Use http://localhost:3000/api/redirect?repo=test&wow=gh for testing to navigate to GitHub
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const wowlink: string = req.query['wow'] as string;
    console.log(wowlink);
    // This should be reading from the source
    const octokit = new Octokit();
    const configResponse = await octokit.rest.repos.getContent({
        owner: "wowlink",
        repo: "default-profile",
        path: "config.yaml",
    });
    console.log(Buffer.from(configResponse.data['content'], 'base64').toString());
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
