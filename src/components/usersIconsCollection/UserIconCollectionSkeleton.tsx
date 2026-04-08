import UserIconSkeleton from "../../ui/icons/UserIconSkeleton.tsx";

interface UserIconCollectionSkeletonProps {
    count?: number,
    size?: number
}

const UserIconCollectionSkeleton = ({ count = 3, size = 24 }: UserIconCollectionSkeletonProps) => (
    <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
        {Array.from({ length: count as number }).map((_, i) => (
            <div key={i} style={{marginLeft: -(size / 3)}}>
                <UserIconSkeleton size={size}/>
            </div>
        ))}
    </div>
);

export default UserIconCollectionSkeleton;