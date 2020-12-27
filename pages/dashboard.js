import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

const DashboardPage = () => {
  const auth = useAuth();

  if (!auth.user) return 'Loading...';

  return <EmptyState />;
};

export default DashboardPage;
