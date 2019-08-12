
import { ChannelsPostRequestPayload, ChannelPostRequestPayload } from "./interfaces";

export function fetchAll(bigCommerceClient) {
    return bigCommerceClient.get("/channels")
}

export function fetchChannel(bigCommerceClient, channelId: string) {
    return bigCommerceClient.get(`/channels/${channelId}`)
}

export function createChannel(bigCommerceClient, externalId: string, isEnabled: boolean, channelName: string, channelPlatform: string, channelType: string) {
    const requestPayload: ChannelsPostRequestPayload = {
        external_id: externalId,
        is_enabled: isEnabled,
        name: channelName,
        platform: channelPlatform,
        type: channelType
    }

    return bigCommerceClient.post("/channels", requestPayload)
}

export function updateChannel(bigCommerceClient, channelId: string, channelName: string, externalId: string, isEnabled: boolean) {

    console.log(isEnabled)
    const requestPayload: ChannelPostRequestPayload = {
        external_id: externalId,
        is_enabled: isEnabled,
        name: channelName
    }

    return bigCommerceClient.put(`/channels/${channelId}`, requestPayload)
}