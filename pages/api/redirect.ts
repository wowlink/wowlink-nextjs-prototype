import { NextApiRequest, NextApiResponse } from 'next';
import { WowLookupFetcher, BuiltInLookupFetcherType, WowLookupFetchRequest, WowLookupFetcherConfig, WowLookupFetchResponse } from "wow-interface";
import { WowLookupFetcherFactory } from "wow-lookup-fetcher";

// Use http://localhost:3000/api/redirect?repo=test&wow=gh for testing to navigate to GitHub
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const wowlink: string = req.query['wow'] as string;
    const fetcher_config: WowLookupFetcherConfig = {
        githubUser: "wowlink",
        githubRepository: "default-profile"
    };
    const fetcher: WowLookupFetcher = WowLookupFetcherFactory(BuiltInLookupFetcherType.GitHub, fetcher_config);
    const fetch_req: WowLookupFetchRequest = {};
    const fetch_res: WowLookupFetchResponse = await fetcher.fetch(fetch_req);
    const lookup: Record<string, string> = fetch_res.wowMapping;
    // This should be a function that looks up wowlink existence
    if (wowlink in lookup) {
        // The link conversion should also be some kind of API
        // to make future implementation of partial replacement
        // easier.
        res.redirect(lookup[wowlink]);
    } else {
        res.redirect('/');
    }
};
