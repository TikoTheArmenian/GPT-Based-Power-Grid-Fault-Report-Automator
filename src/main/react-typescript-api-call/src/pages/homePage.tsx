import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  Elevation,
  H1,
  H5,
  Intent,
  Callout,
  Icon,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import "./HomePage.css";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [leftImage, setLeftImage] = useState("");
  const [rightImage, setRightImage] = useState("");

  useEffect(() => {
    fetchRandomImage(setLeftImage);
    fetchRandomImage(setRightImage);
  }, []);

  const fetchRandomImage = async (
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const response = await fetch("https://source.unsplash.com/random");
    setImage(response.url);
  };

  return (
    <div className="home-container">
      <img
        src={leftImage}
        alt="Random left"
        className="side-image left-image"
      />
      <img
        src={rightImage}
        alt="Random right"
        className="side-image right-image"
      />
      <div className="jumbotron">
        <H1>Welcome to our HomePage</H1>
        <p>This is a Vite React project using BlueprintJS and TypeScript.</p>
        <Button intent={Intent.PRIMARY}>Learn More</Button>
      </div>

      <div className="features-container">
        <Card
          interactive={true}
          elevation={Elevation.TWO}
          className="feature-card"
        >
          <Icon icon={IconNames.DATABASE} iconSize={50} />
          <H5>Feature 1</H5>
          <p>Details about feature 1...</p>
        </Card>

        <Card
          interactive={true}
          elevation={Elevation.TWO}
          className="feature-card"
        >
          <Icon icon={IconNames.FUNCTION} iconSize={50} />
          <H5>Feature 2</H5>
          <p>Details about feature 2...</p>
        </Card>

        <Card
          interactive={true}
          elevation={Elevation.TWO}
          className="feature-card"
        >
          <Icon icon={IconNames.GRAPH} iconSize={50} />
          <H5>Feature 3</H5>
          <p>Details about feature 3...</p>
        </Card>
      </div>

      <footer>
        <Callout>
          <H5>Contact Us</H5>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
        </Callout>
      </footer>
    </div>
  );
};

export default HomePage;
