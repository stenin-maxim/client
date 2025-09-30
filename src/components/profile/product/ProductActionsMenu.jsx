import { Link } from 'react-router';

export default function ProductActionsMenu({ item, actions, onActionClick }) {
    const handleActionClick = (action) => {
        if (onActionClick) {
            onActionClick(action, item);
        }
    };

    return (
        <div className="profile-item__menu">
            <i className="bi bi-three-dots"></i>
            <ul>
                {actions.map((action, index) => (
                    <li key={index}>
                        {action.type === 'link' ? (
                            <Link to={action.to}>
                                <button disabled={action.disabled}>
                                    {action.label}
                                </button>
                            </Link>
                        ) : (
                            <button 
                                onClick={() => handleActionClick(action)}
                                disabled={action.disabled}
                            >
                                {action.label}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
