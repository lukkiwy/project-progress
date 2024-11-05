const createFolderButton = document.getElementById('create-folder-button');
const folderContainer = document.getElementById('folder-container');
const confirmCancelButton = document.getElementById('confirm-cancel-button');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const confirmClose = document.getElementById('confirm-background');
const confirmBackground = document.getElementById('confirm-background');
const confirmWindow = document.getElementById('confirm-window');

const createFolderButtonImg = document.createElement('img');
createFolderButtonImg.src = './assets/images/icon-04.svg';
createFolderButtonImg.className = 'create-img';
createFolderButton.appendChild(createFolderButtonImg);

let folders = JSON.parse(localStorage.getItem('folders')) || [];

function createFolder(folderData) {
	let folderIndex = folders.findIndex(folder => folder.id === folderData.id);

	const folder = document.createElement('div');
	folder.className = 'folder';
	folderContainer.appendChild(folder);

	const taskContainer = document.createElement('div');
	taskContainer.className = 'task-container';
	folder.appendChild(taskContainer);

	const folderName = document.createElement('textarea');
	folderName.className = 'folder-name';
	folder.appendChild(folderName);
	folderName.value = folderData.name;
	folderName.setAttribute('maxlength', '22');

	folderName.addEventListener('input', () => {
		folders[folderIndex].name = folderName.value;
		saveLocalStorage();
	})

	const deleteButton = document.createElement('button');
	folder.appendChild(deleteButton);
	deleteButton.className = 'button delete-button';
	const deleteButtonImg = document.createElement('img');
	deleteButtonImg.src = './assets/images/icon-05.svg';
	deleteButtonImg.className = 'delete-img';
	deleteButton.appendChild(deleteButtonImg);

	function getUserConfirmation() {
		return new Promise((resolve) => {
			confirmBackground.style.visibility = 'visible';

			confirmCancelButton.addEventListener('click', () => {
				confirmBackground.style.visibility = 'hidden';
				resolve(false);
			}, { once: true });

			confirmDeleteButton.addEventListener('click', () => {
				confirmBackground.style.visibility = 'hidden';
				resolve(true);
			}, { once: true });

			confirmBackground.addEventListener('click', () => {
				confirmBackground.style.visibility = 'hidden';
				resolve(false);
			}, { once: true });
		});
	}

	async function handleDelete() {
		const deleteConfirmed = await getUserConfirmation();

		if (deleteConfirmed) {
			folderIndex = folders.findIndex(folder => folder.id === folderData.id);
			folders.splice(folderIndex, 1);
			folder.remove();
			saveLocalStorage();
		}
	}

	deleteButton.addEventListener('click', handleDelete);

	const createTaskButton = document.createElement('button');
	folder.appendChild(createTaskButton);
	createTaskButton.className = 'button create-task-button';
	const createTaskButtonImg = document.createElement('img');
	createTaskButtonImg.src = './assets/images/icon-04.svg';
	createTaskButtonImg.className = 'create-img';
	createTaskButton.appendChild(createTaskButtonImg);

	let tasks = folders[folderIndex].tasks || [];

	function createTask(taskData) {
		let taskIndex = tasks.findIndex(task => task.id === taskData.id);
	  	let edit = 0;
		let selectedDivIndex = 1;
		const task = document.createElement('div');
		task.className = 'task';
		taskContainer.appendChild(task);

		const taskName = document.createElement('textarea');
		taskName.className = 'task-name';
		task.appendChild(taskName);
		taskName.value = taskData.name;
		taskName.readOnly = true;
		taskName.setAttribute('rows', '3');
		taskName.setAttribute('maxlength', '30');

		taskName.addEventListener('input', () => {
			const maxLines = 3;
			const lines = taskName.value.split('\n');
			if (lines.length > maxLines) {
				taskName.value = lines.slice(0, maxLines).join('\n');
			}
			if (lines.length >= maxLines && event.inputType === 'insertLineBreak') {
        	event.preventDefault();
			}
			tasks[taskIndex].name = taskName.value;
			saveLocalStorage();
		})

		const editTaskButton = document.createElement('button');
		task.appendChild(editTaskButton);
		editTaskButton.className = 'button edit-task-button';
		const editTaskButtonImg = document.createElement('img');
		editTaskButtonImg.src = './assets/images/icon-03.svg';
		editTaskButtonImg.className = 'edit-img';
		editTaskButton.appendChild(editTaskButtonImg);

		editTaskButton.addEventListener('click', () => {
			taskName.readOnly = false;
			saveTaskButton.style.display = 'block';
			editTaskButton.style.display = 'none';
			deleteTaskButton.style.display = 'none';
			scaleNumberContainer.style.display = 'block';
		});

		const saveTaskButton = document.createElement('button');
		saveTaskButton.className = 'save-task-button';
		task.appendChild(saveTaskButton);
		saveTaskButton.style.display = 'none';
		saveTaskButton.className = 'button save-task-button';
		const saveTaskButtonImg = document.createElement('img');
		saveTaskButtonImg.src = './assets/images/icon-06.svg';
		saveTaskButtonImg.className = 'save-img';
		saveTaskButton.appendChild(saveTaskButtonImg);

		saveTaskButton.addEventListener('click', () => {
			taskName.readOnly = true;
			saveTaskButton.style.display = 'none';
			editTaskButton.style.display = 'block';
			deleteTaskButton.style.display = 'block';

		});

		const deleteTaskButton = document.createElement('button');
		task.appendChild(deleteTaskButton);
		deleteTaskButton.className = 'button delete-task-button';
		const deleteTaskButtonImg = document.createElement('img');
		deleteTaskButtonImg.src = './assets/images/icon-05.svg';
		deleteTaskButtonImg.className = 'delete-img';
		deleteTaskButton.appendChild(deleteTaskButtonImg);

		async function handleDelete() {
			const deleteConfirmed = await getUserConfirmation();

			if (deleteConfirmed) {
				taskIndex = tasks.findIndex(task => task.id === taskData.id);
				tasks.splice(taskIndex, 1);
				task.remove();
				saveLocalStorage();
			}
		}

		deleteTaskButton.addEventListener('click', handleDelete);

		const scaleContainer = document.createElement('div');
		task.appendChild(scaleContainer);
		scaleContainer.className = 'scale-container';
		const scale = document.createElement('div');
		scaleContainer.appendChild(scale);
		scale.className = 'scale';

		const scaleName = document.createElement('textarea');
		scaleName.className = 'scale-name';
		task.appendChild(scaleName);
		scaleName.style.display = 'none';
		scaleName.setAttribute('maxlength', '40');

		const scaleNumberContainer = document.createElement('div');
		scaleNumberContainer.className = 'scale-number-container';
		task.appendChild(scaleNumberContainer);
		scaleNumberContainer.style.display = 'none';

		const scaleMinusButton = document.createElement('button');
		scaleNumberContainer.appendChild(scaleMinusButton);
		scaleMinusButton.className = 'scale-minus-button';
		scaleMinusButton.textContent = '-';

		const scaleNumber = document.createElement('input');
		scaleNumber.maxLength = 1;
		scaleNumberContainer.appendChild(scaleNumber);
		scaleNumber.className = 'scale-number';

		const scalePlusButton = document.createElement('button');
		scaleNumberContainer.appendChild(scalePlusButton);
		scalePlusButton.className = 'scale-plus-button';
		scalePlusButton.textContent = '+';

		let numberValue = Number(scaleNumber.value);

		scaleNumber.addEventListener('input', () => {
			numberValue = Number(scaleNumber.value);
			createDivs(numberValue);
		});

		scalePlusButton.addEventListener('click', () => {
			numberValue++;
			if (numberValue > 9) {
			numberValue = 9;
			scaleNumber.value = 9;
			} else {
			scaleNumber.value = numberValue;
			}
			createDivs(numberValue);
		});

		scaleMinusButton.addEventListener('click', () => {
			numberValue--;
			if (numberValue < 1) {
			numberValue = 1;
			scaleNumber.value = 1;
			} else {
			scaleNumber.value = numberValue;
			}
			createDivs(numberValue);
		});

		function createDivs(num) {
			scale.innerHTML = '';
			const divs = [];
			for (let i = 0; i < num; i++) {
				let color = Number(tasks[taskIndex].scale[i].color[1]);
				const div = document.createElement('div');
				scale.appendChild(div);
				div.title = tasks[taskIndex].scale[i].value;
				divs.push(div);
				if (edit == 0) {div.className = `scale-dividing ${i+1} ${tasks[taskIndex].scale[i].color}`
				} else {div.className = `scale-dividing ${i+1} ${'c2'}`, divs[0].className = `scale-dividing 1 c3`};
				scaleName.value = tasks[taskIndex].scale[0].value;

				scaleName.addEventListener('input', () => {
					tasks[taskIndex].scale[selectedDivIndex-1].value = scaleName.value
					saveLocalStorage();
					div.title = tasks[taskIndex].scale[i].value;
				})

				editTaskButton.addEventListener('click', () => {
					edit = 1;
					color = 2;
					div.className = `scale-dividing ${i+1} c2`, divs[0].className = `scale-dividing ${1} c3`;
					scaleName.style.display = 'block';
				})

				saveTaskButton.addEventListener('click', () => {
					edit = 0;
					color = Number(tasks[taskIndex].scale[i].color[1]);
					div.className = `scale-dividing ${i+1} ${tasks[taskIndex].scale[i].color}`;
					scaleName.style.display = 'none';
					scaleNumberContainer.style.display = 'none';
				})
				div.addEventListener('click', () => {
					selectedDivIndex = div.className[15];
					if (edit == 1) {color = 2};
					if (color == 0) {
					color = 1, div.className = `scale-dividing ${i+1} ${'c' + color}`;
					} else if (color == 1) {
					color = 0, div.className = `scale-dividing ${i+1} ${'c' + color}`
					} else if (color == 2) {
					divs.forEach((div) => {
						if (div.className.includes('c3')) {
							div.className = `scale-dividing ${div.className[15]} ${'c2'}`
						}
					}),
					div.className = `scale-dividing ${i+1} ${'c3'}`;
					scaleName.value = tasks[taskIndex].scale[i].value
					} else ;
					if (color < 2) {
						tasks[taskIndex].scale[i].color = ('c' + color);
					saveLocalStorage()
					}
				})


			}
			tasks[taskIndex].number = numberValue;
			saveLocalStorage()
		}

		const savedValue = (tasks[taskIndex].number);
		if (savedValue) {
		  numberValue = Number(savedValue);
		  scaleNumber.value = numberValue;
		  createDivs(numberValue);
		}
	}

createTaskButton.addEventListener('click', () => {
	const taskData = {
		id: Math.random().toString(36).substr(2, 9),
		name: 'new task', number: 1,
		scale: [
			{num: 1, value: '1', color: 'c0'},
			{num: 2, value: '2', color: 'c0'},
			{num: 3, value: '3', color: 'c0'},
			{num: 4, value: '4', color: 'c0'},
			{num: 5, value: '5', color: 'c0'},
			{num: 6, value: '6', color: 'c0'},
			{num: 7, value: '7', color: 'c0'},
			{num: 8, value: '8', color: 'c0'},
			{num: 9, value: '9', color: 'c0'}
		]
	};
	tasks.push(taskData);
	saveLocalStorage()
	createTask(taskData);
});
tasks.forEach(task => {
	createTask(task);
});
}
createFolderButton.addEventListener('click', () => {
	const folderData = { id: Math.random().toString(36).substr(2, 9), name: 'new folder', tasks: [] };
	folders.push(folderData);
	localStorage.setItem('folders', JSON.stringify(folders));
	createFolder(folderData);
});
folders.forEach(folder => {
	createFolder(folder);
});
function saveLocalStorage() {
	localStorage.setItem('folders', JSON.stringify(folders));
}