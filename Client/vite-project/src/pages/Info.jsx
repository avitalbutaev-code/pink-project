export default function Info() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="info">
      <h2>Your Info </h2>
      <p>Username: {user.username}</p>
      <p>User Phone: {user.phone}</p>
    </div>
  );
}
