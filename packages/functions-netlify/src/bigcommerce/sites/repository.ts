import { SitePostRequestPayload } from "./interfaces";

export function fetchAll(bigCommerceClient) {
    return bigCommerceClient.get(`/sites`)
}

export function fetchSite(bigCommerceClient, channelId: string) {
    return bigCommerceClient.get(`/channels/${channelId}/site`)
}

export async function createSite(bigCommerceClient, channelId: string, url: string) {
    const requestPayload: SitePostRequestPayload = {
        url: url,
        channel_id: channelId
    }

    console.log(`/channels/${channelId}/site`)

    return bigCommerceClient.post(`/channels/${channelId}/site`, requestPayload)
}

export async function updateSite(bigCommerceClient, channelId: string, url: string) {
    const requestPayload: SitePostRequestPayload = {
        url: url,
        channel_id: channelId
    }

    console.log(`/channels/${channelId}/site`)

    return bigCommerceClient.put(`/channels/${channelId}/site`, requestPayload)
}