export default function splitQuery(query = "") {
  if (query.startsWith("?")) query = query.slice(1);

  let pairs = query.split("&");
  if (pairs.length === 0) return null;

  const queryObject = {};
  pairs.map((pair) => {
    if (pair.split("").includes("=")) {
      const [key, value] = pair.split("=");
      queryObject[key] = value;
    }
  });

  return queryObject;
}
