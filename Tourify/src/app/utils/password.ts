export const passwordStrengthValidator = (password: string): boolean => {
  // at least one number, one lowercase and one uppercase letter
  // at least six characters
  const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})'
  );
  return passwordRegex.test(password);
};
