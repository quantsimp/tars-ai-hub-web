import Seo from '@/components/seo';
import DefaultLayout from '@/layouts/default';
import ViewDetail from '@/views/detail/dalle2';

export default function PageDetail() {
  return (
    <DefaultLayout>
      <Seo title='Detail' />
      <ViewDetail />
    </DefaultLayout>
  );
}
