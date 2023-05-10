import { useState } from "react";
import * as projectActions from "../../../store/project";
import { useDispatch } from "react-redux";

export default function DeleteProject(props) {
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const projectId = props.projectId; // assuming projectId is passed as a prop
        dispatch(projectActions.deleteProject(projectId))
        setIsDeleting(false);
    };

    return (
        <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Project'}
        </button>
    );
}
