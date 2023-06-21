import Seo from '@/components/seo';
import DefaultLayout from '@/layouts/default';
import ViewDetail from '@/views/detail/text-to-audio';

export default function PageDetail() {
  return (
    <DefaultLayout>
      <Seo title='Detail' />
      <ViewDetail />
    </DefaultLayout>
  );
}
