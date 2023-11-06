import { FC, useRef, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { MealPreview } from '../../components/MealPreview/MealPreview';

const NewMeal: FC = () => {
  const mealUrlRef = useRef<HTMLInputElement | null>(null);
  const [response, setResponse] = useState(null);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const mealUrl = mealUrlRef.current?.value;

    if (mealUrl) {
      fetch('/api/newMeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: mealUrl }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => {
          setResponse(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1>New Meal</h1>
        <form onSubmit={handleSubmitForm}>
          <input
            name="mealUrl"
            type="text"
            placeholder="URL"
            ref={(input) => (mealUrlRef.current = input)} // Set the input field's ref
          />
          <button type="submit">Submit</button>
        </form>
        {response && <MealPreview meal={response} />}
      </div>
    </Layout>
  );
};

export default NewMeal;
