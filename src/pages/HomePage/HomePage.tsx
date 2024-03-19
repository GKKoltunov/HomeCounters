import { Main } from "../../components/Main/Main";
import { HomeProvider } from "../../providers/context/HomeProvider/HomeProvider";

export const HomePage = () => {
  return (
    <HomeProvider>
      <Main />
    </HomeProvider>
  );
};
