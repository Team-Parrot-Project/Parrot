import { useState } from "react";

export default function DeleteProject(props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
      setIsDeleting(true);
      const projectId = props.projectId; // assuming projectId is passed as a prop
      try {
        const response = await axios.delete(`/api/projects/${projectId}`);
        setIsDeleting(false);
        // handle successful deletion here
      } catch (error) {
        setIsDeleting(false);
        // handle error here
      }
    };

    return (
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Project'}
      </button>
    );
}
