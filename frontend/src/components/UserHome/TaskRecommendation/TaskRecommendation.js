import { useState } from 'react';

const TaskRecommendation = ({ projectTitle, projectDescription, startDate, endDate, apiKey }) => {
  const [recommendedTasks, setRecommendedTasks] = useState('');

  const generateRecommendedTasks = async () => {
    const prompt = `Given a new project with the following information:\n\nTitle: ${projectTitle}\nDescription: ${projectDescription}\nStart Date: ${startDate}\nEnd Date: ${endDate}\n\nWhat are some recommended tasks to complete for this project?`;

    const requestBody = {
      prompt,
      max_tokens: 256,
      n: 1,
      stop: ['\n\n'],
      model: 'text-davinci-002',
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
    setRecommendedTasks(data.choices[0].text.trim());
  };

  return (
    <div>
      <button onClick={generateRecommendedTasks}>Generate Recommended Tasks</button>
      {recommendedTasks && <div>{recommendedTasks}</div>}
    </div>
  );
};

export default TaskRecommendation;
