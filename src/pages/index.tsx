import ViewHome from '@/views/home';

import Seo from '@/components/seo';
import DefaultLayout from '@/layouts/default';

export default function PageIndex() {
  return (
    <DefaultLayout>
      <Seo />
      <ViewHome />
    </DefaultLayout>
  );
}
