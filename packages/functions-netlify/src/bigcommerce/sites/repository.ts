import { SitePostRequestPayload, SitePutRequestPayload } from "./interfaces";

export function fetchAll(bigCommerceClient) {
    return bigCommerceClient.get(`/sites?page=1&limit=250`)
}

export function fetchSite(bigCommerceClient, siteId: number) {
    return bigCommerceClient.get(`/sites/${siteId}`)
}

export async function createSite(bigCommerceClient, channelId: string, url: string) {
    const requestPayload: SitePostRequestPayload = {
        url: url,
        channel_id: channelId
    }

    console.log(`/channels/${channelId}/site`)

    return bigCommerceClient.post(`/channels/${channelId}/site`, requestPayload)
}

export async function updateSite(bigCommerceClient, siteId: number, url: string) {
    const requestPayload: SitePutRequestPayload = {
        url: url,
        site_id: siteId
    }
    
    return bigCommerceClient.put(`/sites/${siteId}`, requestPayload)
}