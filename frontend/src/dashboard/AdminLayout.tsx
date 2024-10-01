import { ReactNode } from 'react';
import { Sidebar } from './components/Sidebar';
import { SessionHeader } from './components/SessionHeader';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-full xl:w-4/5 mx-5 p-3">
        <SessionHeader />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
