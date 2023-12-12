import '@/styles/globals.css';
import '@/styles/theme.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import { createContext, useState } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

interface ProofInterface {
  proof: string;
  setProof: (proof: string) => void;
}

export const ProofContext = createContext<ProofInterface>({proof: '', setProof: () => {}});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [proof, setProof] = useState<string>('');

  return getLayout(
    <ProofContext.Provider value={{proof, setProof}}>
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Component {...pageProps} />
    </>
    </ProofContext.Provider>
  );
}
