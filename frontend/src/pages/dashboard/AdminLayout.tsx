import { ReactNode } from 'react';
import { Sidebar } from './components/shared/Sidebar';
import { Toaster } from 'react-hot-toast';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-grow overflow-y-auto p-6">
          {children}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  );
};

export default AdminLayout;
