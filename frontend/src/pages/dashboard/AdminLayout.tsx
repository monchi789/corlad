import { ReactNode } from 'react';
import { Sidebar } from './components/shared/Sidebar';
import { SessionHeader } from './components/shared/SessionHeader';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full h-screen overflow-y-auto p-5 xl:mx-2">
        <SessionHeader />
        <div className="mt-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
