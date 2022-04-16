import { Header } from './Header';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
