import { StyleSheet, Text, View } from "react-native";
import React from "react";

const cardData = [
  {
    id: 1,
    image: require("../assets/img.jpg"),
    title: "Card 1",
    description: "Some brief description",
  },
  {
    id: 2,
    image: require("../assets/img.jpg"),
    title: "Card 2",
    description: "Another description",
  },
];

const Card = ({ image, title, description }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const Carousel = () => {
  const renderCard = ({ item }) => <Card {...item} />;

  return (
    <Carousel
      data={cardData}
      renderItem={renderCard}
      sliderWidth={300} // Adjust as needed
      itemWidth={200} // Adjust as needed
    />
    // <h1>Hello</h1>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
