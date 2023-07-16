import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Author}</Card.Text>
      </Card.Body>
    </Card>
  );
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Author: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
