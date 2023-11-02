import { FC } from 'react';
import { Card } from '../components/Card/Card';
import { Layout } from '../components/Layout/Layout';
import { useMealsContext } from '../context/mealsContext';

const Home: FC = () => {
  const { mealsList } = useMealsContext();
  return (
    <Layout>
      <div className="h-full bg-blue-300">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 content-center p-4">
          {mealsList.map((meal) => (
            <Card key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
