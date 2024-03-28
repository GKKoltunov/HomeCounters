import { Main } from "../../components/Main/Main";
import { HomeProvider } from "../../providers/context/HomeProvider/HomeProvider";
import { Modal } from "../../components/Modal/Modal";
import { useState } from "react";

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  function createPortal() {
    const portal = document.createElement("div");
    portal.id = "portal";
    document.body.append(portal);
  }

  return (
    <HomeProvider>
      <Main createPortal={createPortal} setIsOpen={setIsOpen } />
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </HomeProvider>
  );
};
