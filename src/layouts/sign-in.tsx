import { apiAxios } from '@/api-axios';
import { SiweMessage } from 'siwe';
import { useLocalStorage } from 'usehooks-ts';
import { useAccount, useChainId, useSigner } from 'wagmi';

export default function SignIn() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: signer } = useSigner();
  const [, setToken] = useLocalStorage('token', '');
  const signIn = async () => {
    const nonce = (await apiAxios.get('auth/nonce')) as string;
    if (!nonce) {
      throw new Error('Api error');
    }

    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'User login',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    });

    const message = siweMessage.prepareMessage();
    const signature = await signer?.signMessage(message);
    const res = await apiAxios.post('auth/verify', { message, signature });
    setToken(res as unknown as string);
  };

  return (
    <main className='mt-10 flex flex-col items-center justify-center'>
      <p className='my-4 w-[50%] text-center'>Please sign in with your wallet.</p>
      <button
        onClick={signIn}
        className='flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-medium text-black'
      >
        Sign In
      </button>
    </main>
  );
}
