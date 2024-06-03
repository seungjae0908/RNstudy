import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [todoGoals, setTodoGoals] = useState([]);

  // 추가 버튼을 누르면 할 일 목록을 추가하는 함수
  const addGoalHandler = (enteredGoalText) => {
    // useState setter 메서드의 스냅샷 방식
    // 콜백 함수의 매개값은 해당 상태 변수의 최신 값이 전달됨.
    setTodoGoals((currentTodoGoals) => [
      ...currentTodoGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  };

  const deleteGoalhandler = (id) => {
    setTodoGoals((currentTodoGoals) => {
      return currentTodoGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        {/* 
        ScrollView는 전체 화면이 렌더링 될때 안의 항목들을 전부 렌더링합니다
        이로 인해 성능 상의 저하가 나타날 수 있습니다.
        (보이지 않는 영역까지 렌더링을 진행하기 때무에 목록이 많다면 로딩이 길어짐.)
        FlatList는 보이는 영역만 일단 렌더링을 진행하고,
        */}
        <FlatList
          data={todoGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalhandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 4,
  },
});
