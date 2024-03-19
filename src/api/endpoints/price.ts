
import server from "../server";






export const getPrice = () => {

  return server.get(`/data`).then(({ data }) => data);
};
