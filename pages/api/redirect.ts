import { NextApiRequest, NextApiResponse } from 'next';
import {
    WowLookupFetcher,
    BuiltInLookupFetcherType,
    WowLookupFetchRequest,
    WowLookupFetcherConfig,
    WowLookupFetchResponse,
    BuiltInWowUrlConverterType,
    WowUrlConverter,
    WowUrlConverterConfig,
    WowUrlConvertRequest,
    WowUrlConvertResponse,
} from "wow-interface";
import { WowLookupFetcherFactory } from "wow-lookup-fetcher";
import { WowUrlConverterFactory } from "wow-url-converter";

// Use http://localhost:3000/api/redirect?repo=test&wow=gh for testing to navigate to GitHub
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const wowlink: string = req.query['wow'] as string;
    const fetcher_config: WowLookupFetcherConfig = {
        githubUser: "wowlink",
        githubRepository: "default-profile"
    };
    const fetcher: WowLookupFetcher = WowLookupFetcherFactory(
        BuiltInLookupFetcherType.GitHub, fetcher_config);
    const fetch_req: WowLookupFetchRequest = {};
    const fetch_res: WowLookupFetchResponse = await fetcher.fetch(fetch_req);
    const converter_config: WowUrlConverterConfig = {
        fetcherResponse: fetch_res
    };
    const converter: WowUrlConverter = WowUrlConverterFactory(
        BuiltInWowUrlConverterType.Basic, converter_config);
    const converter_req: WowUrlConvertRequest = {
        wowUrl: wowlink,
    };
    const converter_res: WowUrlConvertResponse = converter.convert(converter_req);
    res.redirect(converter_res.fullUrl);
};
