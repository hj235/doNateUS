const ListingDetails = ({ listing }) => {

    return (
        <div className="listing-detais">
            <h4>{listing.title}</h4>
            <p><strong> Description: </strong> {listing.description} </p>
            <p><strong> Date: </strong> {listing.created_at} </p>
            <p><strong> Status: </strong> {listing.status} </p>
        </div>
    )
}

export default ListingDetails;