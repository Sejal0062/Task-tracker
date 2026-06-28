import './Notification.css';

export default function Notification({ message, type }) {
  return (
    <div className={`notification notification-${type}`}>
      {message}
    </div>
  );
}