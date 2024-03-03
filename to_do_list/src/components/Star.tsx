import { FaStar } from "react-icons/fa";

type RatingProps = {
    rating: string
}

const Star = ({rating}: RatingProps) => {
  return (
    <>
    {rating === "very_important" && 
          <span>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
            </span>
          }
          {rating === "important" && 
          <span>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
            </span>
          }
          {rating === "medium" && 
          <span>
              <FaStar/>
              <FaStar/>
              <FaStar/>
            </span>
          }
          {rating === "slightly_important" && 
          <span>
              <FaStar/>
              <FaStar/>
            </span>
          }
          {rating === "not_important" && 
          <span>
              <FaStar/>
            </span>
          }
    </>
  )
}

export default Star