import { LoginPayload } from 'src/auth/dtos/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const authorizationSplit = authorization.split('.');

  if (authorization.length < 3 || !authorizationSplit[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSplit[1], 'base64').toString('ascii'),
  );
};
