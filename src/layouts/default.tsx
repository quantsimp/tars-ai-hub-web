import Footer from '@/components/footer';
import Header from '@/components/header';

type Props = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return (
    <div className='min-h-screen bg-[#080E0B] font-sans text-white antialiased'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
