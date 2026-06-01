export const fetchApi = async (url, method = "GET", body = null) => {
  let res;
  if (method === "GET" || method === "DELETE") {
    res = await fetch(url, {
      method,
    });
  } else {
    res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  if (res.ok) {
    return res;
  } else {
    return null;
  }
};
