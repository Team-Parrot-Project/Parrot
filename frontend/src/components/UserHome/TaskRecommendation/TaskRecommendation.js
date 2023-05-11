import { useState } from 'react';
import './TaskRecommendation.css'

const TaskRecommendation = ({ project, recommendedTasks, setRecommendedTasks }) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  // const [recommendedTasks, setRecommendedTasks] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [displayTasks, setDisplayTasks] = useState('')

  const generateRecommendedTasks = async () => {
    const prompt = `Given a new project with the following information:\n\nTitle: ${project.title}\nDescription: ${project.description}\n\nWhat are some recommended tasks to complete for this project? Please provide the recommended tasks each capitalized in comma seperated format for each task, remove numbering, and the period at the beginning/end.`;

    const requestBody = {
      prompt,
      temperature: 0.2,
      max_tokens: 2048,
      n: 1,
      model: 'text-davinci-003',
    };

    setButtonDisabled(true);

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      setRecommendedTasks(data.choices[0].text.trim().split(','));
    }
    const displayTasks = data.choices[0];

    setButtonClicked(true); 
  };

  return (
    <div>
      {!buttonClicked && (
        <button onClick={generateRecommendedTasks}>Generate Recommended Tasks</button>
      )}
      {recommendedTasks.length > 0 && <div className="recommended-tasks">The recommended tasks are rendered in the Task Create forms below: {displayTasks}</div>}
    </div>
  );
};

export default TaskRecommendation;