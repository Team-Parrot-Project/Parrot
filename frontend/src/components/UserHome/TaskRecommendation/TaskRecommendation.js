import { useState } from 'react';
import './TaskRecommendation.css'

const TaskRecommendation = ({ title, description, startDate, endDate }) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const [recommendedTasks, setRecommendedTasks] = useState('');

  const generateRecommendedTasks = async () => {
    const prompt = `Given a new project with the following information:\n\nTitle: ${title}\nDescription: ${description}\nStart Date: ${startDate}\nEnd Date: ${endDate}\n\nWhat are some recommended tasks to complete for this project?`;

    const requestBody = {
      prompt,
      temperature: 0.2,
      max_tokens: 2048,
      n: 1,
      model: 'text-davinci-003',
    };

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log(data);
    if (data.choices && data.choices.length > 0) {
      setRecommendedTasks(data.choices[0].text.trim());
    }
  };

  return (
    <div>
      <button onClick={generateRecommendedTasks}>Generate Recommended Tasks</button>
      {recommendedTasks && <div className="recommended-tasks">{recommendedTasks}</div>}

    </div>
  );
};

export default TaskRecommendation;
