import ViewDetail from '@/views/detail/chatgpt';

import Seo from '@/components/seo';
import DefaultLayout from '@/layouts/default';

export default function PageDetail() {
  return (
    <DefaultLayout>
      <Seo title='Detail' />
      <ViewDetail />
    </DefaultLayout>
  );
}
