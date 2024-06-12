import { Link } from "react-router-dom";

const ListingDetails = ({ listing }) => {
    return (
      <div className="listing-details">
        <div className="media">
          {listing.media && <img src={listing.media} alt="Listing Media" className="listing-media" />}
        </div>
        <Link to={`/listing/${listing._id}`}>{listing.title}</Link>
        <div className="user-profile">
          {listing.owner.profilePicture && <img src={listing.owner.profilePicture} alt="User Profile" className="user-profile-pic" />}
          <p>{listing.owner.name}</p>
        </div>
        <p><strong></strong>{listing.description}</p>
        <p><strong>Status: </strong>{listing.status}</p>
      </div>
    );
  };
  
  export default ListingDetails;