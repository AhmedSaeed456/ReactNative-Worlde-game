import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { colors, keys, CLEAR, ENTER } from "./src/constants";
import Keyboard from "./src/components/Keyboard";
import CustomAlert from "./src/components/CustomAlert";
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

  // custome alert
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  const checkGameState = () => {
    if (checkIfWin()) {
      setTitle("Heeeh");
      setMessage("W I N N E R🎉,come everyday");
      setShowAlert(true);
    } else if (checkIfLose()) {
      setTitle("Eeew");
      setMessage("L O S E R😔,try again tomorrow");
      setShowAlert(true);
    }
  };
  const checkIfWin = () => {
    const row = rows[curRow - 1];

    return row.every((letter, i) => letter === letters[i]);
  };
  const checkIfLose = () => {
    return curRow === rows.length;
  };
  // const onKeyPressed = (key) => {
  //   const updatedRows = copyArray(rows);

  //   console.log(curCol, " ", curRow);
  //   if (key === "CLEAR") {
  //     if (curCol <= 0) {
  //       setCurRow(curRow);
  //       setCurCol(curCol);
  //     } else {
  //       setCurCol(curCol - 1);
  //     }
  //     updatedRows[curRow][curCol - 1] = "";
  //   } else {
  //     if (curCol < 4) setCurCol(curCol + 1);
  //     else {
  //       setCurCol(0);
  //       setCurRow(curRow + 1);
  //     }
  //     updatedRows[curRow][curCol] = key;
  //   }
  //   setRows(updatedRows);
  // };
  const onKeyPressed = (key) => {
    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }

      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const isActiveCell = (row, col) => {
    return row === curRow && col === curCol;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];
    console.log(row, curRow);
    if (row >= curRow) {
      return colors.black;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const getAllColors = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  };
  const greenCaps = getAllColors(colors.primary);
  const yellowCaps = getAllColors(colors.secondary);
  const greyCaps = getAllColors(colors.darkgrey);

  return (
    <SafeAreaView style={styles.container}>
      <CustomAlert
        visible={showAlert}
        title={title}
        message={message}
        onClose={handleCloseAlert}
      />
      <StatusBar style="light" />
      <Text style={styles.title}>WORLDE</Text>

      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((cell, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isActiveCell(i, j)
                      ? colors.lightgrey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
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
