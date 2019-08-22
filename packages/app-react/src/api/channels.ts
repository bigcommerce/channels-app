import axios from "axios";

const BASE_URL = `${window.location.href}`;
const FUNCTION = `.netlify/functions/bigcommerce_proxy_channels`;

export async function fetchAllChannels() {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });

    if (!result.data) {
      throw new Error("No data returned in response");
    }

    return result.data;
  } catch (err) {
    return err;
  }
}

export async function fetchChannel(channelId: number) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/channel&channel_id=${channelId}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });

    if (!result.data) {
      throw new Error("No data returned in response");
    }

    return result.data;
  } catch (err) {
    return err;
  }
}

export async function fetchChannelSite(channelId: number) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/channel&channel_id=${channelId}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });

    if (!result.data) {
      throw new Error("No data returned in response");
    }

    return result.data;
  } catch (err) {
    return err;
  }
}

export async function createChannel(
  name: string,
  externalId: string,
  type: string,
  platform: string,
  enabled: boolean
) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        channel_name: name,
        external_id: externalId,
        channel_type: type,
        channel_platform: platform,
        enabled: enabled
      }
    });

    return result.data;
  } catch (err) {
    return err;
  }
}

export async function updateChannel(
  channelId: number,
  name: string,
  externalId: string,
  enabled: boolean
) {
  try {
    const result = await axios({
      url: encodeURI(`${BASE_URL}${FUNCTION}?path=/channel`),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      data: {
        channel_id: channelId,
        channel_name: name,
        external_id: externalId,
        is_enabled: enabled
      }
    });

    return result.data;
  } catch (err) {
    return err;
  }
}
