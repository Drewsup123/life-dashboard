import React from 'react';
import { BucketListItemType } from '../../routes/BucketList';

export interface IProps extends BucketListItemType {
    
}

const BucketListItem: React.FC<IProps> = (props: IProps) => {
    const { name, description, notes, completed, expectedCompletion } = props;
    return (
        <div className="bucket-list-item">
            <span>
                <i className={`material-icons ${completed ? "text-success" : "text-danger"}`}>{completed ? "check_circle" : "cancel"}</i>
            </span>
            <span>{name}</span>
            <span>{description}</span>
            <span>{notes}</span>
        </div>
    );
}

export default BucketListItem;