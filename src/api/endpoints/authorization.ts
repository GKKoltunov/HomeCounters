import server from "../server";

type Params = {
  username: string;
  password: string;
};



export const postUser = ({ ...params }: Params) => {
  return server
    .post("/login",  {...params } )
    .then(({ data }) => data);
};
