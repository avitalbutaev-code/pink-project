import alien from "../assets/party-alien.png";

export default function Info() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="info-container">
      <div className="image-wrapper">
        <img src={alien} alt="alien" />

        <div className="info">
          <h2>Your Info</h2>
          <p>Username: {user.username}</p>
          <p>User Phone: {user.phone}</p>
        </div>
      </div>
      <h2>Hover over me ⬆</h2>
    </div>
  );
}
