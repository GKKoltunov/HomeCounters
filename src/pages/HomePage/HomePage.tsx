import { Main } from '../../components/Main/Main';
import { HomeProvider } from '../../providers/context/HomeProvider/HomeProvider';
import { ModalProvider } from '../../providers/context/ModalProvider/ModalProvider';

export const HomePage = () => {
  return (
    <HomeProvider>
      <ModalProvider>
        <Main />
      </ModalProvider>
    </HomeProvider>
  );
};
