import React, { Component } from "react";
import { AppRegistry, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

// Source: https://www.npmjs.com/package/react-native-tableview-simple#installation

const CellVariant = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View
        style={{ alignItems: 'center', flexDirection: 'row', flex: 1, paddingVertical: 10 }}
      >
        <Text
          allowFontScaling
          numberOfLines={1}
          style={{ flex: 1, fontSize: 20 }}
        >
          {props.title}
        </Text>
      </View>
    }
  />
);

export default class App extends Component<{}> {

  constructor(props)
  {
      super(props);
      this.state = {isLoading:true};
  }

  componentDidMount(){
      return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            dataSource: responseJson.movies,
          }, function(){

          });

        })
        .catch((error) =>{
          console.error(error);
        });
    }


  render() {
    if(this.state.isLoading) {
      return(
          <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                  </View>
      )
    }

    /*
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    )
    */
    return (
      <ScrollView contentContainerStyle={styles.stage}>
        <View
          style={{
            backgroundColor: "#37474F",
            height: 300,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        <View
            style={{
              backgroundColor: "#ffc107",
              width: 80,
              height: 80,
              borderRadius: 10
            }}
        />
        <View
            style={{
              backgroundColor: "#ffc102",
              width: 80,
              height: 80,
              borderRadius: 10
            }}
        />
        </View>
        <TableView>
  <Section>
    <CellVariant title="Element 1" />
    <CellVariant title="Element 2" />
    <CellVariant title="Element 3" />
    <CellVariant title="Element 4" />
  </Section>
</TableView>
        <TableView>
          <Section footer="All rights reserved.">
            <Cell
              title="Help / FAQ"
              titleTextColor="#007AFF"
              onPress={() => console.log("open Help/FAQ")}
            />
            <Cell
              title="Contact Us"
              titleTextColor="#007AFF"
              onPress={() => console.log("open Contact Us")}
            />
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: "#EFEFF4",
    paddingBottom: 20,
    flex: 1
  }
});
