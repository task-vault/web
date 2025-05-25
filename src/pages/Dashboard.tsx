import Statusbar from '../components/Statusbar';
import Tasks from '../components/Tasks';

const Dashboard = () => {
  return (
    <div className='flex max-h-screen flex-col items-center overflow-hidden'>
      <Statusbar />
      <Tasks />
    </div>
  );
};

export default Dashboard;
