import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { colors, keys } from "./src/constants";
import Keyboard from "./src/components/Keyboard";

const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  // console.log([...arr]);
  return [...arr.map((rows) => [...rows])];
};

export default function App() {
  const word = "ahmed";
  const letters = word.split("");

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  const onKeyPressed = (key) => {
    const updatedRows = copyArray(rows);

    console.log(curCol, " ", curRow);
    if (key === "CLEAR") {
      if (curCol <= 0) {
        setCurRow(curRow);
        setCurCol(curCol);
      } else {
        setCurCol(curCol - 1);
      }
      updatedRows[curRow][curCol - 1] = "";
    } else {
      if (curCol < 4) setCurCol(curCol + 1);
      else {
        setCurCol(0);
        setCurRow(curRow + 1);
      }
      updatedRows[curRow][curCol] = key;
    }
    setRows(updatedRows);
  };

  const isActiveCell = (row, col) => {
    return row === curRow && col === curCol;
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORLDE</Text>

      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View style={styles.row}>
            {row.map((cell, j) => (
              <View
                style={[
                  styles.cell,
                  {
                    borderColor: isActiveCell(i, j)
                      ? colors.lightgrey
                      : colors.darkgrey,
                  },
                ]}
              >
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard onKeyPressed={onKeyPressed} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
  map: {
    height: 100,
    alignSelf: "stretch",
    marginVertical: 20,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 1,
    borderColor: colors.darkgrey,
    height: 30,
    flex: 1,
    aspectRatio: 1,
    margin: 3,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 30,
  },
});
