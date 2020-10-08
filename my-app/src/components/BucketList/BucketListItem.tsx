import React from 'react';
import { BucketListItemType } from '../../routes/BucketList';

export interface IProps extends BucketListItemType {
    
}

const BucketListItem: React.FC<IProps> = (props: IProps) => {
    const { name, description, notes, created, completed, expectedCompletion } = props;
    return (
        <div className="bucket-list-item">
            <span>{name}</span>
            <span>{description}</span>
            <span>{created}</span>
            <span>{completed}</span>
            <span>{notes}</span>
        </div>
    );
}

export default BucketListItem;