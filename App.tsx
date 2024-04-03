/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useState, useContext } from 'react';
import type {PropsWithChildren} from 'react';
import {
	KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


type textProp = {
	text: string
}
type buttonProp = {
	action: () => void
}
type actionProp = {
	action: (string: string) => void
}
type ToDoProp = {
	toDos: ToDo[]
}


class ToDo {
	name: string
	done: boolean

	constructor(name: string) {
		this.done = false
		this.name = name
	}
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [toDos, setToDos] = useState<ToDo[]>([]);

  return (
		<View style={styles.background}>
			<TaskContainer toDos={{toDos}}></TaskContainer>
			<Controller action={{action:(name: string) => {
				const updatedToDos = [...toDos, new ToDo(name)];
          		setToDos(updatedToDos);
			}}}></Controller>
			<View style={styles.buffer}></View>
		</View>

  );
}

function Controller(props: {action: actionProp}) {
	const [text, onChangeText] = React.useState("New Task");
	const [visible, setVisible] = useState(false);
	const [sign, setText] = useState('+')

	function buttonAction() {
		if(!visible) {
			setVisible(true)
			setText('^')
		} else {
			props.action.action(text)
			setVisible(false)
			setText('+')
		}
	}

	return  <View style={styles.controller}>
			<TextInput
			style={[styles.taskInput, {opacity: visible ? 1 : 0}]}
			onChangeText={onChangeText}
			value={text}/>
			<AddButton action={{action:() => {buttonAction()}}} text={{text: sign}}></AddButton>
		</View>
}

function TaskContainer(props: {toDos: ToDoProp}) {

	return <View style={styles.taskContainer}>
		{props.toDos.toDos.map((todo, index) => (
        <Task text={todo.name}></Task>
      ))}
	</View>
}

function Task(props: textProp) {
	const [name, setName] = useState(props.text)
	return <View style={styles.task}>
		<View style={{width: 200}}>
			<Text style={{fontSize: 20}}>{name}</Text>
		</View>
		<TouchableOpacity onPress={() => console.log("Delete")}
				style={styles.taskDeleteButton}>
				<Text style={styles.deleteText}>Delete</Text>
		</TouchableOpacity>
	</View>
}

function AddButton(props : {action: buttonProp, text: textProp}) {

	return  <TouchableOpacity onPress={props.action.action}
				style={styles.addButton}>
				<Text style={styles.plus}>{props.text.text}</Text>
			</TouchableOpacity>
	
}

const styles = StyleSheet.create({
  background: {
	flex: 1
  },
  controller: {
    backgroundColor: 'rgba(50, 50, 50, 1)',
	flexDirection: 'row',
  },
  taskContainer: {
	backgroundColor: 'rgba(100,100, 100, 1)',
	flex: 6,
	flexDirection: 'column',
	alignItems: 'center',
  },
  addButton: {
	backgroundColor: 'rgba(150, 150, 150, 1)',
	borderRadius: 10,
	justifyContent: 'center',
	alignItems: 'center',
	width: '30%',
	margin: '2%',
  },
  plus: {
	fontSize: 40
  },
  taskInput: {
	backgroundColor: 'rgba(100, 100, 100, 1)',
	borderRadius: 10,
	justifyContent: 'center',
	alignItems: 'center',
	width: '65%',
	margin: '2%',
  },
  buffer: {
	width: '100%',
	height: '5%',
	backgroundColor: 'rgba(50, 50, 50, 1)',
  },
  task: {
	height: 50,
	flexDirection: 'row',
	backgroundColor: 'rgba(150, 150, 150, 1)',
	margin: 5,
	padding: 10,
  },
  taskDeleteButton: {
	height: '100%',
	width: '15%',
	backgroundColor: 'rgba(200, 100, 100, 1)',
	borderRadius: 10,
	justifyContent: 'center',
	alignItems: 'center',
  },
  deleteText: {
	textAlign: 'center',
	alignItems: 'center',
	height: '100%',
	fontSize: 15
  }

  
});

export default App;
