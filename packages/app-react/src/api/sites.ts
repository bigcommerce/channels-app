import axios from "axios";

const BASE_URL = `${window.location.href}`;
const FUNCTION = `.netlify/functions/bigcommerce_proxy_sites`;

export async function fetchAllSites() {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });

    console.log("remove");
    console.log(JSON.stringify(result));

    if (!result.data) {
      throw new Error("No data returned in response");
    }

    return result.data;
  } catch (err) {
    return err;
  }
}

export async function fetchSite(siteId: number) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/site&site_id=${siteId}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });

    console.log("remove");
    console.log(JSON.stringify(result));

    if (!result.data) {
      throw new Error("No data returned in response");
    }

    return result.data;
  } catch (err) {
    return err;
  }
}

export async function createSite(channelId: number, url: string) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        channel_id: channelId,
        url: url
      }
    });

    return result.data;
  } catch (err) {
    return err;
  }
}

export async function updateSite(siteId: number, url: string) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/site`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      data: {
        site_id: siteId,
        url: url
      }
    });

    console.log("remove");
    console.log(JSON.stringify(result));

    if (!result.data) {
      throw new Error("No data returned in response");
    }

    return result.data;
  } catch (err) {
    return err;
  }
}
