import React from "react";
import axios from "axios";

import {
  Card,
  Col,
  Row,
  Rate,
  Modal,
  Button,
  Select,
  Typography,
  Form,
  Input,
  message,
} from "antd";
import { useState, useEffect } from "react";
import TextArea from "antd/es/input/TextArea";

const { Meta } = Card;
const MoviesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [sort, setSort] = useState("asc");
  const onAddRatingClick = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:5005/movies/${id}`)
      .then((res) => res.data)
      .then((getIdReview) => setIdReview(getIdReview));

    setIsModalOpen(true);
    setSelectedMovie(movie);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [getIdReview, setIdReview] = useState();
  const [movie, getMovie] = useState([]);
  const [movieData, setMovieData] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [rate, setRate] = useState([]);
  const [flag , setFlag] = useState(false)
  let totalStar = 0;
  const MovieData = (id) => {
    setMovieData(true);
    setMovieId(id);
  };

  const getMoviesData = async () => {
    await axios
      .get("http://localhost:5005/movies")
      .then((res) => res.data)
      .then((movie) => getMovie(movie));
  };

  const addReview = (id) => {
    let data = {
      id: getIdReview.id,
      movieId: getIdReview.id,
      name: movieName,
      rating: rating,
      review: review,
    };
    axios
      .post("http://localhost:5005/review", data)
      .then((res) => {
        if (res.status === 200) {
          setFlag(!flag)
          setIsModalOpen(false);
          message.success("Your review has been submitted. Thank you!");
        }
      })
      .catch((err) => console.error(err));
  };

  const getReviewData = async () => {
    await axios
      .get("http://localhost:5005/movies/review")
      .then((res) => res.data)
      .then((rate) => setRate(rate))
      

    console.log(" totalStar", totalStar);
  };
  useEffect(() => {
    getMoviesData();
    getReviewData();
  }, [flag]);

  //Sort
  const getSort = () => {
    const sorted = [...movie];
    sorted.sort((a, b) => {
      if (sort === "asc") {
        return a.movieRating > b.movieRating ? 1 : a.movieRating === b.movieRating ? 0 : -1;
      } else {
        return a.movieRating < b.movieRating ? 1 : a.movieRating === b.movieRating ? 0 : -1;
      }
    });
    return sorted;
  };
  const submit = () => {
    message.success("Your review has been submitted. Thank you!");
  };
  return (
    <>
      <div className="sort">
        <Typography.Text>Sort by </Typography.Text>
        <Select
          onChange={(value) => {
            setSort(value);
          }}
          defaultValue={"asc"}
          options={[
            { label: "Rating: Low to High", value: "asc" },
            { label: "Rating: High to Low", value: "desc" },
          ]}
        ></Select>
      </div>
      <Row gutter={[16, 16]}>
        {getSort(movie).map((item, index) => (
          <>
            <Col span={4}>
              <Card
                key={item.id}
                hoverable
                cover={
                  <img
                    alt={`Poster of ${item.MovieName}`}
                    src={item.moviePoster}
                  />
                }
                actions={[
                  <Button
                    onClick={() => {
                      onAddRatingClick(item.id);
                    }}
                    type="link"
                    style={{ fontWeight: "200", letterSpacing: "2px" }}
                  >
                    ADD RATING
                  </Button>,
                ]}
              >
                <Meta
                  title={item.movieName} 
                  style={{textAlign:"center"}}
                  description={<>
                    <Rate allowHalf defaultValue={item.movieRating} disabled />
                  </>}
                />
              </Card>
            </Col>
          </>
        ))}
      </Row>
      <Modal
        title={selectedMovie.MovieName}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form className="reviewForm" style={{ padding: "20px" }}>
          <Form.Item
            label="Your name"
            name={"name"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input
              placeholder="Add your name"
              maxLength={50}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Your rating"
            name={"userRating"}
            rules={[{ required: true, message: "Rating required" }]}
          >
            <Rate
              allowHalf
              defaultValue={0}
              value={rating}
              onChange={setRating}
            />
          </Form.Item>
          <Form.Item label="Your review" name={"userReview"}>
            <TextArea
              placeholder="Add your review"
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" block onClick={(id) => addReview(id)}>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};
export default MoviesList;
