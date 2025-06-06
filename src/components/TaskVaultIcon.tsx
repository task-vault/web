import { ComponentProps } from 'react';

const TaskVaultIcon = (props: ComponentProps<'img'>) => {
  return (
    <img
      {...props}
      src='/favicon.png'
      alt='task-vault logo'
      className={props.className || 'inline-block h-20 w-20'}
    />
  );
};

export default TaskVaultIcon;
