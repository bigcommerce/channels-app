import axios from "axios";

const BASE_URL = `${window.location.href}`;
const FUNCTION = `.netlify/functions/bigcommerce_proxy_routes`;

export async function fetchAllRoutes(siteId: number) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/&site_id=${siteId}`,
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

export async function fetchRoute(siteId: number, routeId: number) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/routes&site_id=${siteId}&route_id=${routeId}`,
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

export async function createRoute(
  siteId: number,
  type: string,
  matching: string,
  route: string
) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/&site_id=${siteId}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        matching: matching,
        route: route,
        type: type
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

export async function updateRoute(
  siteId: number,
  routeId: number,
  type: string,
  matching: string,
  route: string
) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/&site_id=${siteId}&route_id=${routeId}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      data: {
        type: type,
        matching: matching,
        route: route
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

export async function deleteRoute(siteId: number, routeId: number) {
  try {
    const result = await axios({
      url: `${BASE_URL}${FUNCTION}?path=/&site_id=${siteId}&route_id=${routeId}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
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
