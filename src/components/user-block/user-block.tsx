import { AuthorizationStatus } from '../../const.ts';
import { UserBlockAuth } from './user-block-auth.tsx';
import { UserBlockNoAuth } from './user-block-no-auth.tsx';

type UserBlockProps = {
  authorizationStatus: AuthorizationStatus;
};
export function UserBlock({
  authorizationStatus,
}: UserBlockProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    <UserBlockAuth />
  ) : (
    <UserBlockNoAuth />
  );
}

export default UserBlock;
