export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}
const registerFormValidateError = ({
  name,
  email,
  password,
  confirmPassword,
  username,
}: RegisterUserInput) => {
  const errors = {
    value: 0,
  };
  if (!name) {
    errors.value++;
    errors['name'] = 'Name is required';
  }
};
