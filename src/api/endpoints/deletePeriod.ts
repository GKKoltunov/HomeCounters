import server from "../server";


type Params = {
  id: string;
};

export const deletePeriod = ({id}:Params) => {
  return server.delete(`/period/${id}`, {  }).then(({ data }) => data);
};
