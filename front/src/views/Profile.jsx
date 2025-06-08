import Header from "../components/Header";
import UserProfileForm from "../components/UserProfileForm";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile-page">
      <Header />

      <div className="profile-content">
        <div className="profile-header">
          <h1>Mi Perfil</h1>
          <p>Gestiona tu información personal y configuración de cuenta</p>
        </div>

        <div className="profile-layout">
          <div className="profile-main">
            <UserProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
