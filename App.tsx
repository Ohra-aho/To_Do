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
	action: (parameter: any, parameter2: any | undefined) => void
}
type ToDoProp = {
	toDos: ToDo[]
}
type numberProp = {
	x: number
}
type toDoProp = {
	toDo: ToDo
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
			<TaskContainer toDos={{toDos}} action={{action:(x: number) => {
				const updatedToDos = [...toDos.slice(0, x), ...toDos.slice(x + 1)];
				setToDos(updatedToDos);
			}}}
			checkAction={{action:(toDo: ToDo, x: number) => {
				const updatedToDos = [...toDos.slice(0, x), toDo, ...toDos.slice(x + 1)]
				setToDos(updatedToDos);
			}}}></TaskContainer>
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
			props.action.action(text, undefined)
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

function TaskContainer(props: {toDos: ToDoProp, action: actionProp, checkAction: actionProp}) {
	
	return <ScrollView style={styles.taskContainer}>
		{props.toDos.toDos.map((todo, index) => (
        <Task toDo={{toDo: todo}} x={{x: index}} action={props.action} checkAction={props.checkAction}></Task>
      ))}
	</ScrollView>
}

function Task(props: {toDo: toDoProp, x: numberProp, action: actionProp, checkAction: actionProp}) {
	
	const [toDo, setToDo] = useState(props.toDo.toDo)


	function toggleCheckbox() {
		const updatedToDo = { ...toDo, done: !toDo.done }
		setToDo(updatedToDo)
		props.checkAction.action(toDo, props.x.x)
	}

	function remove() {
		props.action.action(props.x.x, undefined)
	}



	return <View style={styles.task}>
		<View style={{width: '65%'}}>
			<Text style={{fontSize: 20}}>{props.toDo.toDo.name + " " + props.x.x}</Text>
		</View>
		<View>
			<TouchableOpacity onPress={toggleCheckbox}
					style={[
						styles.checBox, 
						{backgroundColor: toDo.done ? 'rgba(100, 250, 100, 1)' : 'rgba(250, 250, 250, 1)'}
						]}>
					<Text style={{color: 'rgba(0, 0, 0, 1)', fontSize: 15}}>{toDo.done ? "X" : ""}</Text>
			</TouchableOpacity>
		</View>
		<TouchableOpacity onPress={remove}
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
	width: '20%',
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
  },
  checBox: {
	borderRadius: 5,
	justifyContent: 'center',
	alignItems: 'center',
	height: 20,
	width: 20,
	margin: 5,
	marginRight: 20,
  }

  
});

export default App;
