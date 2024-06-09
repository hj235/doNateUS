import { Link } from "react-router-dom";

const ListingDetails = ({ listing }) => {

    return (
        <div className="listing-detais">
            <Link>{listing.title}</Link>
            <p>{listing.media}</p>
            <p><strong> </strong> {listing.description} </p>
            <p><strong> </strong> {listing.status} </p>
        </div>
    )
}

export default ListingDetails;