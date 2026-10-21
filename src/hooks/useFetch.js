import { useCallback, useEffect, useState } from "react";

/** Tải JSON từ url. Trả về { data, loading, error, refetch }. */
export default function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
        setState({ data: await res.json(), loading: false, error: null });
      } catch (err) {
        if (err.name === "AbortError") return; // component đã bị gỡ hoặc url đổi
        setState({ data: null, loading: false, error: err.message });
      }
    })();
    return () => controller.abort(); // cleanup
  }, [url, tick]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, refetch };
}
