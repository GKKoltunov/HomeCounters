import { Form } from '../../components/Form/Form';
import { FormProvider } from '../../providers/context/FormProvider/FormProvider';

export const LoginPage = () => {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
};
