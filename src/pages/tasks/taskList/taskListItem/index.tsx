import { useDispatch } from 'react-redux';
import { Button, EButtonVariant } from '../../../../components/button';
import { DeleteIcon, EditIcon } from '../../../../components/svg/icons';
import { ITask } from '../../../../models/tasks';
import { AppDispatch } from '../../../../store';
import { setTaskDetail } from '../../../../store/slices/appState';
import cx from 'classnames';
import styles from './styles.module.scss';

interface ITaskListItemProps {
    data: ITask
}

export const TaskListItem = ({
    data
}: ITaskListItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleEditTask = () => {
        dispatch(setTaskDetail(data));
    };

    return (
        <div className={cx({
            [styles.wrapper]: true,
            [styles.wrapper_isDone]: data.isDone
        })}>
            <div className={styles.header}>
                <p className={styles.name}>{data.name}</p>
                <Button
                    variant={EButtonVariant.ICON}
                    onClick={handleEditTask}
                    className={styles.icon}>
                    <EditIcon />
                </Button>
                <Button
                    variant={EButtonVariant.ICON_BLACK}
                    className={styles.icon}>
                    <DeleteIcon />
                </Button>
            </div>
            <p className={styles.desc}>
                {data.description}
            </p>
        </div>
    );
};
