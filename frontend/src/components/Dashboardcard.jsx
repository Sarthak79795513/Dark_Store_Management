import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === 'Inventory') navigate('/warehouse');
    else if (title === 'Orders') navigate('/shop');
    else if (title === 'Staff') navigate('/delivery');
    else if (title === 'Stock Prediction') navigate('/admin'); // Or a separate prediction route
  };

  return (
    <div onClick={handleClick} className="card">
      <h3>{title}</h3>
    </div>
  );
};
