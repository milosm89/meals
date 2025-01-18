import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useContext, useEffect, useLayoutEffect } from "react";
import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({route, navigation}) {

    const favoriteMealsCtx = useContext(FavoritesContext)
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

    function changeFavoritestatusHandler () {
        if(mealIsFavorite) {
            favoriteMealsCtx.removeFavorite(mealId);
        }
        else{
            favoriteMealsCtx.addFavorite(mealId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton 
                icon= {mealIsFavorite ? "star" : "star-outline"} 
                color="white" 
                onPress={changeFavoritestatusHandler}/>
            }
        });
    }, [navigation, changeFavoritestatusHandler])

    return (
        <ScrollView style={styles.rootContainer}>
            <Image 
                style={styles.image}
                source={{uri: selectedMeal.imageUrl}} 
            />
            <Text style={styles.title} >{selectedMeal.title}</Text>
            
            <MealDetails 
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 30
    },
    image: {
        width: '100%',
        height: 250,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        textAlign: 'center',
        margin: 8,
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        width: '80%'
    }
});