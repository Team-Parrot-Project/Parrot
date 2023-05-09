import ProjectCreateForm from "./ProjectCreateForm/ProjectCreateForm";
import TaskCreateForm from "./TaskCreateForm/TaskCreateForm";

export default function UserHome () {



    return (
      <>
        <h2>I'm on the home page</h2>
        <ProjectCreateForm />
        <TaskCreateForm />
      </>
    );
}
