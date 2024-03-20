import server from "../server";

type Params = {
  date: string;
  hot: string;
  drainage: string;
  electricity: string;
  cold: string;
}

export const newPeriod = ({ ...params }: Params) => {
  return server.post(`/new_period`, { ...params }).then(({ data }) => data);
};
