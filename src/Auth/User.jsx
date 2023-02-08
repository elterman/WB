import { useAtomValue } from 'jotai';
import SvgUser from '../Icons/Svg User';
import { a_auth } from '../atoms';

const User = () => {
  const auth = useAtomValue(a_auth);
  const { user } = auth || {};
  const { avatar, displayName } = user || {};

  return (
    <>
      <div id="user-name" className="ellipsis" style={{ margin: '0 20px' }}>
        {displayName || 'User Name'}
      </div>
      <div id="user-avatar" style={{ marginRight: '8px' }}>
        {avatar ? <img src={avatar} alt="user" style={{ width: '32px', borderRadius: '50%' }} /> : <SvgUser width={32} />}
      </div>
    </>
  );
};

export default User;
