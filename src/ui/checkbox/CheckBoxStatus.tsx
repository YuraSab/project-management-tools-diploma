import { TestAndProjectStatuses } from "../../store/projectControlStore";
import { TaskPriority, TaskStatus } from "../../types/task";
import StatusText from "../statusText/StatusText";

type AvailableTypes = TestAndProjectStatuses | TaskStatus | TaskPriority;
interface CheckBoxStatusProps<T extends AvailableTypes> {
    status: T,
    setStatusFilter: (value: T) => void,
    checked?: boolean,
}

const CheckBoxStatus = <T extends AvailableTypes,>({ status, setStatusFilter, checked = false }: CheckBoxStatusProps<T>) => {
    return( 
        <div>
            <input 
                checked={checked}
                type={"checkbox"} 
                name={"status"} 
                value={status} 
                style={{marginRight: 4}} 
                onChange={() => setStatusFilter(status)}
            />
            <StatusText status={status}/>
        </div>
    )
}

export default CheckBoxStatus;