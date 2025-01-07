import { useState } from 'react';
import DataFetcher from './DataFetcher';
import SidebarCart from './SidebarCart';

const ParentComponent: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <DataFetcher tipo="controlPlagas" toggleSidebar={handleToggleSidebar} filters={{}} />
      { }
      <SidebarCart show={showSidebar} toggleSidebar={handleToggleSidebar} />
    </div>
  );
};

export default ParentComponent;
