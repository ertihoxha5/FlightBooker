import React from "react";

function ProfilePage() {
  return (
    <div className="container-fluid">
    
      <h1 className="h3 mb-4 text-gray-800">My Profile</h1>

      <div className="row">
        <div className="col-lg-4">
        
          <div className="card shadow mb-4">
            <div className="card-body text-center">
              <img 
                src="/assets/img/profile-placeholder.jpg" 
                alt="Profile" 
                className="img-profile rounded-circle mb-3" 
                style={{ width: "150px", height: "150px" }}
              />
              <h5 className="card-title">John Doe</h5>
              <p className="card-text">Premium Member</p>
              <a href="#" className="btn btn-primary btn-sm">Edit Profile</a>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
        
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Profile Information</h6>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" className="form-control" id="fullName" value="John Doe" disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="emailAddress">Email Address</label>
                  <input type="email" className="form-control" id="emailAddress" value="john@example.com" disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" className="form-control" id="phone" value="+355 69 123 4567" disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="membership">Membership</label>
                  <input type="text" className="form-control" id="membership" value="Premium" disabled />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
