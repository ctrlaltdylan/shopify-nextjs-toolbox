import { useState, useEffect } from "react";

/**
 * Retrieve the host query param and store it locally for future use
 */
export default function useHost() {
  const [host, sethost] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.location) {
      const queryHost = new URLSearchParams(window.location.search).get(
        "host"
      );

      if (queryHost) {
        setHost(queryHost);
      }
    }
  }, []);

  return host;
}
