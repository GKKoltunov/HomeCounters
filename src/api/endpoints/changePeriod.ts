import server from "../server";

type Params = {
    date?: string;
    hot: string;
    drainage: number;
    electricity: string;
    cold: string;
    id: string;
  }

export const changePeriod = ({id,...params }: Params) => {
    return server.patch(`/period/${id}`, {...params}).then(({ data }) => data);
  };