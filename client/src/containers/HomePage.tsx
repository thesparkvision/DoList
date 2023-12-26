import { Box, Card, CardBody, Flex, IconButton, Image, Input, InputGroup, InputRightElement, LinkBox, LinkOverlay, List, ListItem, Select, Tag, Text } from "@chakra-ui/react"
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import placeHolderPic from "../assets/placeholderPic.png"
import { BACKEND_URLS, PRIORITY_VALUES, STATUS_VALUES } from "../lib/Constants";
import { ChangeEventHandler, useEffect, useState } from "react";
import { failedNotification, successNotification } from "../lib/Utils";
import "./HomePage.scss"

type TaskItem = {
    id: number,
    status: string;
    priority: string;
    title: string;
    description?: string;
    due_date?: Date | null;
    completion_date?: Date | null;
};

type TaskItemProps = {
    task: TaskItem;
    fetchTasks: () => void;
};

type TaskItemsProps = {
    tasks: TaskItem[];
    fetchTasks: () => void;
}

type CreateTaskBoxProps = {
    fetchTasks: () => void;
}

function HomePage() {
    const [currentTasks, setCurrentTasks] = useState<TaskItem[]>([])

    const fetchTasks = async () => {
        try {
            const API_TOKEN = localStorage.getItem("API_TOKEN")
            const response = await fetch(BACKEND_URLS.TASK_PAGE_URL, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_TOKEN}`
                },
            }
            );
            const data = await response.json();

            if (!response.ok) {
                throw {detail: data.detail}
            }
    
            setCurrentTasks(data);
        } catch (error) {
          console.error('Error:', (error as { detail: string }).detail);
        }
    };
    
    useEffect(() => {
        fetchTasks();
    }, []); 

    return (
        <Box id="homePage">
            <CreateTaskBox fetchTasks={fetchTasks} />
            <br />

            <Text fontSize="lg" id="homePage-header">Tasks</Text>
            <br />
            
            {currentTasks.length == 0 && <NoTaskCard />}

            {currentTasks.length > 0 && (
                <TaskItems tasks={currentTasks} fetchTasks={fetchTasks} />
            )}
        </Box>
    )
}

export const CreateTaskBox: React.FC<CreateTaskBoxProps> = ({fetchTasks}) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);

    const handleSubmitTask = () => {
        setIsSubmitBtnDisabled(true)

        const requestPayload = {
            "title": newTaskTitle
        }

        const API_TOKEN = localStorage.getItem("API_TOKEN")
        fetch(BACKEND_URLS.TASK_PAGE_URL,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_TOKEN}`
                },
                body: JSON.stringify(requestPayload)
            }
        ).then((response) => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw { status: response.status, detail: errorData?.detail };
                });
            }

            successNotification({
                title: "New Task Added!"
            })

            setNewTaskTitle("")
            fetchTasks()
        }).catch((error) => {
            failedNotification({
                title: "Something went wrong with task creation!",
                description: error?.detail
            })
        }).finally(() => {
            setIsSubmitBtnDisabled(false)
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmitTask()
        }
    };

    const updateNewTaskTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
        const titleValue: string = event.target.value
        setNewTaskTitle(titleValue)
    }

    return (
        <Flex justifyContent={"space-between"}>
            <InputGroup>
                <Input 
                    maxLength={200} 
                    placeholder='Enter your task' 
                    value={newTaskTitle}
                    onChange={updateNewTaskTitle}
                    onKeyDown={handleKeyDown}
                />

                <InputRightElement>
                    <IconButton
                        colorScheme='transparent'
                        aria-label='create task'
                        onClick={handleSubmitTask}
                        isDisabled={isSubmitBtnDisabled}
                        icon={
                            <CheckIcon color="green" />
                        }
                    />
                </InputRightElement>
            </InputGroup>
        </Flex>
    )
}

export const NoTaskCard = () => {
    return (
        <Card id="noTaskCard">
            <Text fontWeight={"medium"}>Currently, there are no tasks.</Text>
            <Image src={placeHolderPic} height="15em" width="20em" />
        </Card>
    )
}

export const TaskItems: React.FC<TaskItemsProps> = ({tasks, fetchTasks}) => {
    return (
        <List>
            {tasks.map((task) =>
                <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
            )}
        </List>
    )
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, fetchTasks }) => {

    const handleDeleteTask = () => {
        const API_TOKEN = localStorage.getItem("API_TOKEN")
        fetch(BACKEND_URLS.TASK_PAGE_URL + `${task.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`
            },
        }).then((response) => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw { status: response.status, detail: errorData?.detail };
                });
            }
            fetchTasks()
        }).catch((error) => {
            failedNotification({
                title: "Something went wrong with task deletion!",
                description: error?.detail
            })
        })
    }

    const handlePatchTask = (status: string) => {
        const requestPayload = {
            "status": status
        }

        const API_TOKEN = localStorage.getItem("API_TOKEN")
        fetch(BACKEND_URLS.TASK_PAGE_URL + `${task.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify(requestPayload)
        }).then((response) => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw { status: response.status, detail: errorData?.detail };
                });
            }
        }).catch((error) => {
            failedNotification({
                title: "Something went wrong with task updation!",
                description: error?.detail
            })
        })
    }

    const updateTaskStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const status = event.target.value
        handlePatchTask(status)
    }

    return (
        <ListItem>
            <LinkBox as='article'>
                <Card 
                    variant="outline" 
                    className="taskCard"
                >
                    <CardBody
                        className="taskCard-body"
                    >
                        <Text className="taskCard-priority">
                            <Tag colorScheme={PRIORITY_VALUES[task.priority].color}>
                                {task.priority}
                            </Tag>
                        </Text>

                        <LinkOverlay 
                            href={BACKEND_URLS.TASK_PAGE_URL + `/${task.id}`}
                            className="taskCard-title"
                        >
                            <Text >
                                {task.title}
                            </Text>
                        </LinkOverlay>
                        
                        <Select 
                            variant='filled' 
                            width={"max-content"} 
                            placeholder='Select status'
                            bg={STATUS_VALUES[task.status].color}
                            defaultValue={task.status}
                            onChange={updateTaskStatus}
                        >
                            {Object.values(STATUS_VALUES).map(statusObject =>  
                                <option key={statusObject.value} value={statusObject.value}>
                                    {statusObject.value}
                                </option>    
                            )}
                        </Select>

                        <IconButton 
                            aria-label="delete-task-btn" 
                            icon={<DeleteIcon/>} 
                            onClick={handleDeleteTask}
                        />
                    </CardBody>
                </Card>
            </LinkBox>
        </ListItem>
    )
}

export default HomePage;