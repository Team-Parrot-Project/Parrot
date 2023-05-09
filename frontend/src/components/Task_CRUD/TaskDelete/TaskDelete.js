export default function DeleteTask () {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const taskId = props.taskId; // assuming taskId is passed as a prop
        try {
            const response = await axios.delete(`/api/tasks/${taskId}`);
            setIsDeleting(false);
            // handle successful deletion here
        } catch (error) {
            setIsDeleting(false);
            // handle error here
        }
    };
    return (
        <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Task'}
        </button>
    );
}
